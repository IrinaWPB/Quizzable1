import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon, Menu, MenuItemProps } from "semantic-ui-react"
import { clientSocketInstance } from '../socketio-frontend'
import { ButtonElement } from './Button'
import { OnlineContainer, MessageDiv, ChatContainer, CloseButton, SendButton } from '../styles/statusBar.styles'
import { OnlineContext, UserContext, OnlinePlayersContext } from '../context/UserContext'
import { invitationSound, messageSound } from './Sounds'
import { Header } from '../styles/statusBar.styles'
import { FormContainer } from '../styles/form.styles'
import chatIconSrc from '../assets/images/chat.png'
import '../styles/chat.css'

interface IOnlineNavbarProps {}

enum MenuState {
  messages = "Invitations",
  friends = "Online Players",
  goOnline = "goOnline",
}

interface IOnlineNavbarProps {
  setOnlineBar: (status: boolean) => void
}

/** OnlineNavBar tracks state of multiple values:
 * online state, current user, online players, playerId to be able
 * to perform online game between 2 users via socket.io
 * 
 * Renders a block where user can "go_online", see online users and send game invitations.
 */
const OnlineNavbar: React.FunctionComponent<IOnlineNavbarProps> = ({setOnlineBar}) => {  
  const { online, setOnlineStatus } = React.useContext(OnlineContext)
  const { currentUser } = React.useContext(UserContext)
  const [ activeItem, setActiveItem ] = React.useState<MenuState>()
  const [ messageFrom, setMessageFrom ] = React.useState<string>(null)
  const [ chatMessage, setChatMessage ] = React.useState<string>("")
  const { onlinePlayers, setOnlinePlayers } = useContext(OnlinePlayersContext)
  const [ chatOpen, setChatOpen ] = React.useState<boolean>(false)
  const [ chatIcon, setChatIcon ] = React.useState<boolean>(false)
  const playerId = clientSocketInstance.id
  const navigate = useNavigate()
  let newMessage: any = ""
  //sets online status to true
  const setOnlineTrue = (): void => {
    setOnlineStatus(true);
  };

  //sets online status to false, hides messages(if there are any) 
  const setOnlineFalse = (): void => {
    setOnlineStatus(false)
    //offline users can't see any invitations
    setMessageFrom(null)
    setActiveItem(MenuState.messages)
    setChatOpen(false)
    setChatIcon(false)
  };

  //updates online players
  const handleOnlinePlayerChange = (data: {[key: string] : string}): void => {
    setOnlinePlayers(data.players_online)
  };

  //toggle button to go online/offline
  const handleOnlineButtonClick = (): void => {
    if (online) {
      clientSocketInstance.emit("go_offline")
    } else {
      clientSocketInstance.emit("go_online", { username: currentUser.username })
    }
  }

  //updates messageFrom state
  const handleInvitationUpdate = (data: { invitation_from: string}): void => {
    setMessageFrom(data.invitation_from)
    invitationSound()
  }
  
  //Sends invitation and navigates to wait for game to start
  const handleInvitationClick = (id: string): void => {
    clientSocketInstance.emit("send_invitation", { toId: id, fromId: playerId })
    navigate('/multi-game')
  } 
  
  //opens chat screen, sends players ids to server
  const handleStartChatClick = (id: string): void => {
    console.log('starting chat chat icon is', chatIcon)
    clientSocketInstance.emit("start_chat", { toId: id, fromId: playerId })
    setChatOpen(true)
    setActiveItem(MenuState.messages)
  } 
  //closes chat window and hides chatIcon
  const closeChat = (): void => {
    setChatIcon(false)
    setChatOpen(false)
    console.log(chatIcon, chatOpen)
  }
  
  //starts a game when joined
  const handleJoinGameClick = (id: string) => {
    navigate('/multi-game') 
    clientSocketInstance.emit("join_game", { toId: id, fromId: playerId })
  }
  
  //if player is online - sets active item to a clicked item
  const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: MenuItemProps): void => {
    if (online) setActiveItem(data.name as MenuState)
  };

  const handleSendMessage = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    if (!chatIcon) setChatIcon(true)
   
    clientSocketInstance.emit("new_chat_message", { chatMessage, playerId })

    const chat = document.querySelector('.chat_body')
    let messageWrapper = document.createElement('div')
    messageWrapper.className = 'my_message_wrapper'
    let message = document.createElement('div')
    message.className = 'my_message'
    message.innerText = chatMessage
    messageWrapper.append(message)
    chat.append(messageWrapper)
    setChatMessage("")
  }

  const handleNewMessage = (data: {message: string, sender: string}): void => {
    if (chatOpen) {
      const chat = document.querySelector('.chat_body')
      let messageWrapper = document.createElement('div')
      messageWrapper.className = 'opponents_message_wrapper'
      let message = document.createElement('div')
      message.className = 'opponents_message'
      message.innerText = data.message
      let sender = document.createElement('span')
      sender.innerText = data.sender
      messageWrapper.append(sender)
      messageWrapper.append(message)
      chat.append(messageWrapper)
      messageSound()
    } else {
      setChatIcon(true)
      invitationSound()
    }
  }

  React.useEffect(() => {
    clientSocketInstance.on("online", setOnlineTrue)
    clientSocketInstance.on("offline", setOnlineFalse)
    clientSocketInstance.on("updated_online_players", handleOnlinePlayerChange)
    clientSocketInstance.on("invitation", handleInvitationUpdate)
    clientSocketInstance.on("new_message", handleNewMessage)

    return () => {
      clientSocketInstance.off("online", setOnlineTrue)
      clientSocketInstance.off("offline", setOnlineFalse)
      clientSocketInstance.off("updated_online_players", handleOnlinePlayerChange)
      clientSocketInstance.off("invitation", handleInvitationUpdate)
      clientSocketInstance.off("new_message", handleNewMessage)
    } 
  }, [chatIcon, chatOpen])

  return (<>
    <OnlineContainer>
    <CloseButton onClick={() => {setOnlineBar(false)}}>
        X
    </CloseButton>
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
          { !online || Object.keys(onlinePlayers).length === 0
          ? <span>0</span>
          : <span>{Object.keys(onlinePlayers).length - 1}</span> } 
      </div>
      { chatIcon &&
      <span onClick={()=>setChatOpen(true)} >
        <img src={chatIconSrc} alt='chat_icon' width='30px'/>
      </span> }
      <div>
        <Menu.Item style={{margin: "10px"}}>
          <Icon name="circle" color={ online ? "green" : "red" } style={{marginRight: "10px"}}/>
          <Button color={ online ? "red" : "green" } onClick={ handleOnlineButtonClick } size="large" content={ online ? "Go Offline" : "Go Online" }/>
        </Menu.Item>
      </div>
      </OnlineContainer> 
    { activeItem === MenuState.friends && Object.keys(onlinePlayers).length > 0 &&
      <OnlineContainer>
        <h1>Online Players</h1>
        <div className='onlinePlayers'>
          {Object.keys(onlinePlayers).length > 0 
            ? Object.keys(onlinePlayers).map(key => 
              onlinePlayers[key] !== currentUser.username &&
                <div key={key}>
                  <Header>{ onlinePlayers[key] }</Header> 
                  <ButtonElement actions={ () => handleInvitationClick(key) } text="Invite to play" />
                  <ButtonElement actions={ () => handleStartChatClick(key) } text="Start Chat" />
                </div> )
            : <p>No online players</p> 
            }
        </div>
      </OnlineContainer> }
     
      { activeItem === MenuState.messages && messageFrom &&
      <OnlineContainer style={{flexDirection: "column"}}>
        <h1>Player {onlinePlayers[messageFrom]} invited you to play:</h1>
        <div>
          <ButtonElement text="Join Game" actions={ ()=>handleJoinGameClick(messageFrom) } />
        </div>
        <div>
          <ButtonElement text="Cancel" actions={ ()=>setMessageFrom(null) } />
        </div>
      </OnlineContainer> }
      { chatOpen &&
      <ChatContainer>
        <CloseButton onClick={closeChat}>X</CloseButton>

        <div className='chat_body'>
        </div>

        <FormContainer>
          <MessageDiv>
              <textarea id="chatMessage" value={chatMessage} cols={30}
                        name="chatMessage" placeholder='Enter message...'
                        onChange={ (e) => setChatMessage(e.target.value) } />
            <SendButton onClick={handleSendMessage}>Send</SendButton>
          </MessageDiv> 
        </FormContainer>
      </ChatContainer>}  
    </>
)}

export default OnlineNavbar;

