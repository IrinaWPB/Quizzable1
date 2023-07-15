import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Menu, MenuItemProps } from "semantic-ui-react";
import { clientSocketInstance } from '../socketio-frontend';
import { ButtonElement } from './Button';
import { OnlineContainer } from '../styles/statusBar.styles';
import { OnlineContext, UserContext, OnlinePlayersContext } from '../context/UserContext';
import { invitationSound } from './Sounds';

interface IOnlineNavbarProps {}

enum MenuState {
  messages = "Invitations",
  friends = "Online Players",
  goOnline = "goOnline",
}

const OnlineNavbar: React.FunctionComponent<IOnlineNavbarProps> = () => {  
  const { online, setOnlineStatus } = React.useContext(OnlineContext)
  const { currentUser } = React.useContext(UserContext)
  const [ activeItem, setActiveItem ] = React.useState<MenuState>();
  const [ messageFrom, setMessageFrom ] = React.useState<string>(null)

  const { onlinePlayers, setOnlinePlayers } = useContext(OnlinePlayersContext)
  const playerId = clientSocketInstance.id
  const navigate = useNavigate()

  const setOnlineTrue = (): void => {
    setOnlineStatus(true);
  };
  const setOnlineFalse = (): void => {
    setOnlineStatus(false)
    //offline users can't see any invitations
    setMessageFrom(null)
  };

  //updates online players
  const handleOnlinePlayerChange = (data): void => {
    setOnlinePlayers(data.players_online);
  };

  //toggle button to go online/offline
  const handleOnlineButtonClick = (): void => {
    if (online) {
      clientSocketInstance.emit("go_offline");
    } else {
      clientSocketInstance.emit("go_online", { username: currentUser.username });
    }
  }
  //updates messageFrom state
  const handleMessageUpdate = (data: { invitation_from: string}): void => {
    setMessageFrom(data.invitation_from)
    invitationSound()
  }
  
  //
  const handleInvitationClick = (id: string): void => {
    clientSocketInstance.emit("send_invitation", { toId: id, fromId: playerId })
    navigate('/multi-game')
  } 

  const handleJoinGameClick = (id: string) => {
    navigate('/multi-game') 
    clientSocketInstance.emit("join_game", { toId: id, fromId: playerId })
  }

  const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: MenuItemProps): void => {
    //if not online and want to see online users switvh to online
    if (!online && activeItem === MenuState.friends) {
      clientSocketInstance.emit("go_online", { username: currentUser.username });
      console.log()
    }
    setActiveItem(data.name as MenuState);
  };

  React.useEffect(() => {
    clientSocketInstance.on("online", setOnlineTrue);
    clientSocketInstance.on("offline", setOnlineFalse);
    clientSocketInstance.on("updated_online_players", handleOnlinePlayerChange);
    clientSocketInstance.on("invitation", handleMessageUpdate)

    return () => {
      clientSocketInstance.off("online", setOnlineTrue);
      clientSocketInstance.off("offline", setOnlineFalse);
      clientSocketInstance.off("updated_online_players", handleOnlinePlayerChange);
      clientSocketInstance.off("invitation", handleMessageUpdate)
    } 
  }, []);
  
  return (<>
    <OnlineContainer>
      <div style={{fontSize: "1.5rem"}}>
        <Menu.Item
          style={{margin: "10px"}}
          name={MenuState.messages}
          active={activeItem === MenuState.messages}
          onClick={handleItemClick} />
          {messageFrom && <span>1</span>}
        <Menu.Item
          style={{margin: "10px"}}
          name={MenuState.friends}
          active={activeItem === MenuState.friends}
          onClick={handleItemClick} /> 
          { online && Object.keys(onlinePlayers).length > 0
          ? <span>{Object.keys(onlinePlayers).length - 1 }</span>
          : <span>{Object.keys(onlinePlayers).length}</span> } 
      </div>
        
      <div>
        <Menu.Item style={{margin: "10px"}}>
          <Icon name="circle" color={ online ? "green" : "red" } style={{marginRight: "10px"}}/>
          <Button color={ online ? "red" : "green" } onClick={ handleOnlineButtonClick } size="large" content={ online ? "Go Offline" : "Go Online" }/>
        </Menu.Item>
      </div>
      </OnlineContainer> 
    { activeItem === MenuState.friends && Object.keys(onlinePlayers).length > 0 &&
      <OnlineContainer>
        <h1>Live Players</h1>
        <div>
          {Object.keys(onlinePlayers).length > 0 
            ? Object.keys(onlinePlayers).map(key => 
              onlinePlayers[key] !== currentUser.username &&
                <div key={key}>
                  <ButtonElement actions={ () => handleInvitationClick(key) } text={ onlinePlayers[key] } />
                </div> )
            : <p>No online players</p> 
            }
        </div>
      </OnlineContainer> }
      { activeItem === MenuState.messages && messageFrom &&
      <OnlineContainer style={{flexDirection: "column"}}>
        <h1>Player {onlinePlayers[messageFrom]} invited you to play:</h1>
        <div>
          <ButtonElement text="Join Game" actions={ () => handleJoinGameClick(messageFrom) } />
        </div>
        <div>
          <ButtonElement text="Cancel" actions={ ()=> setMessageFrom(null) } />
        </div>
      </OnlineContainer> }
    </>
);
};

export default OnlineNavbar;

