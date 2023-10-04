import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon, Menu, MenuItemProps } from "semantic-ui-react"
import { clientSocketInstance } from '../socketio-frontend'
import { ButtonElement } from './Button'
import { OnlineContainer, MessageDiv, ChatContainer, CloseButton, SendButton } from '../styles/statusBar.styles'
import { OnlineContext, UserContext, OnlinePlayersContext, ChatContext, Message} from '../context/UserContext'
import { invitationSound, messageSound } from './Sounds'
import { Header } from '../styles/statusBar.styles'
import { FormContainer } from '../styles/form.styles'
import chatIconSrc from '../assets/images/chat.png'
import '../styles/chat.css'
//library for automatic scrolling
import ScrollToBottom from 'react-scroll-to-bottom'

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
  const { currentUser } = useContext(UserContext)
  const { online, setOnlineStatus } = useContext(OnlineContext)
  const { chatMessages, setChatMessages } = useContext(ChatContext)
  const { onlinePlayers, setOnlinePlayers } = useContext(OnlinePlayersContext)

  const [ activeItem, setActiveItem ] = React.useState<MenuState>()
  const [ invitationFrom, setInvitationFrom ] = React.useState<string>(null)
  const [ chatOpen, setChatOpen ] = React.useState<boolean>(false)
  const [ chatIcon, setChatIcon ] = React.useState<boolean>(false)
  const [ newOutgoingMessage, setNewOutgoingMessage ] = React.useState<string>('')
  const [ isRead, setIsRead ] = React.useState<boolean>(false)
  const [ opponentId, setOpponentId] = React.useState<string>(null)

  const playerId = clientSocketInstance.id
  const navigate = useNavigate()


  //sets online status to true
  const setOnlineTrue = (): void => {
    setOnlineStatus(true);
  };

  //sets online status to false, hides messages(if there are any) 
  const setOnlineFalse = (): void => {
    setOnlineStatus(false)
    //offline users can't see any invitations
    setInvitationFrom(null)
    setActiveItem(MenuState.messages)
    setChatOpen(false)
    setChatIcon(false)
    setChatMessages([])
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
  const handleInvitationUpdate = (data: {invitation_from: string}): void => {
    setInvitationFrom(data.invitation_from)
    invitationSound()
  }
  
  //Sends invitation and navigates to wait for game to start
  const handleInvitationClick = (id: string): void => {
    clientSocketInstance.emit("send_invitation", { toId: id, fromId: playerId })
    navigate('/multi-game')
  } 
  
  //opens chat screen, sends players ids to server
  const handleStartChatClick = (id: string): void => {
    console.log('opponent', id)
    clientSocketInstance.emit("start_chat", { toId: id, fromId: playerId })
    setOpponentId(id)
    setChatOpen(true)
    setActiveItem(MenuState.messages)
    console.log('opponent id', opponentId, 'opponent name', onlinePlayers[opponentId])
  } 
  //closes chat window and hides chatIcon
  const closeChat = (id: string): void => {
    clientSocketInstance.emit("send_unread_reciept", id)
    setChatIcon(false)
    setChatOpen(false)
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
    if (newOutgoingMessage.length > 0) {
      clientSocketInstance.emit("new_chat_message", { newOutgoingMessage, playerId, opponentId })
      addNewChatMessage(currentUser.username, newOutgoingMessage, true, isRead)
    }
  }

  const addNewChatMessage = (sender: string, message: string, outgoingStatus: boolean, readStatus: boolean) => {
    setChatMessages((messages: Message[]) => [...messages, {
      senderName: sender,
      messageBody: message,
      outgoing: outgoingStatus,
      timestamp: new Date(),
      read: readStatus
    }])
    messageSound()
    if (outgoingStatus === true) setNewOutgoingMessage('')
  }

  const handleNewMessage = (data: {message: string, sender: string}): void => {
    console.log('Got new message')
    addNewChatMessage(onlinePlayers[data.sender], data.message, false, isRead)
    if (!chatOpen) {
      setChatIcon(true)
      invitationSound()
    }
  }
  const handleChatIconClick = (id: string): void => {
    clientSocketInstance.emit("send_read_reciept", id)
    setChatOpen(true)
    setIsRead(true)
  }

  const handleReadStatus = (status: boolean) => {
    console.log('Opponent read my messages')
    setIsRead(status)
  }
  React.useEffect(() => {
    clientSocketInstance.on("online", setOnlineTrue)
    clientSocketInstance.on("offline", setOnlineFalse)
    clientSocketInstance.on("updated_online_players", handleOnlinePlayerChange)
    clientSocketInstance.on("invitation", handleInvitationUpdate)
    clientSocketInstance.on("new_message", handleNewMessage)
    clientSocketInstance.on("messages_read", ()=>handleReadStatus(true))
    clientSocketInstance.on("messages_not_read", ()=>handleReadStatus(false))

    return () => {
      clientSocketInstance.off("online", setOnlineTrue)
      clientSocketInstance.off("offline", setOnlineFalse) 
      clientSocketInstance.off("updated_online_players", handleOnlinePlayerChange)
      clientSocketInstance.off("invitation", handleInvitationUpdate)
      clientSocketInstance.off("new_message", handleNewMessage)
      clientSocketInstance.off("messages_read", ()=>handleReadStatus(true))
      clientSocketInstance.off("messages_not_read", ()=>handleReadStatus(false))
    } 
  }, [chatIcon, chatOpen, opponentId])
  console.log(chatMessages)
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
          {invitationFrom && <span>1</span>}
       
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
      <span onClick={ ()=>handleChatIconClick(opponentId) } >
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
     
      { activeItem === MenuState.messages && invitationFrom &&
      <OnlineContainer style={{flexDirection: "column"}}>
        <h1>Player {onlinePlayers[invitationFrom]} invited you to play:</h1>
        <div>
          <ButtonElement text="Join Game" actions={ ()=>handleJoinGameClick(invitationFrom) } />
        </div>
        <div>
          <ButtonElement text="Cancel" actions={ ()=>setInvitationFrom(null) } />
        </div>
      </OnlineContainer> }

      { chatOpen &&
      <ChatContainer>
        <CloseButton onClick={()=>closeChat(opponentId)}><span>{currentUser.username}</span> X</CloseButton>
          <ScrollToBottom className='chat_body'>
            {chatMessages && 
              chatMessages.map((m: Message) => 
                m.outgoing === false ?
                  <div key={m.messageBody} className='opponents_message_wrapper'>
                    <div className='sendersName'>
                      <p>{m.senderName}</p>
                    </div>
                    <div className='opponents_message'>
                      <div className='message_body'>
                        <p>{m.messageBody}</p>
                      </div>
                      <div className='timestamp'>
                        <p>{m.timestamp.getHours()}:{m.timestamp.getMinutes()}</p>
                      </div>
                    </div>
                  </div>
                :
                <div key={m.messageBody} className='my_message_wrapper'>
                  <div className='my_message'>
                    <div className='message_body'>
                      <p>{m.messageBody}</p>
                    </div>
                    <div className='timestamp'>
                      <p>
                        {m.timestamp.getHours()}:{m.timestamp.getMinutes()}
                        {isRead && 
                          <span className="read">✔</span>}
                      </p>
                    </div>
                  </div>
                </div>
            )}
          </ScrollToBottom>
        <FormContainer>
          <MessageDiv>
              <textarea id="chatMessage" value={newOutgoingMessage} cols={30}
                        name="chatMessage" placeholder='Enter message...'
                        onChange={(e) => setNewOutgoingMessage(e.target.value)} />
            <SendButton onClick={handleSendMessage}>Send</SendButton>
          </MessageDiv> 
        </FormContainer>
      </ChatContainer>}  
    </>
)}

export default OnlineNavbar;

