import React from "react"
import { UserData } from "../types/user"


type UserContextType = {
  currentUser: UserData | null
}

type OnlineStateType = {
  online: boolean
  setOnlineStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export type OnlinePlayersType = {
  onlinePlayers: {
    [key: string] : string
  }
  setOnlinePlayers: React.Dispatch<React.SetStateAction<{}>>
}

export type Message = {
  senderName: string,
  messageBody: string,
  outgoing: boolean,
  timestamp: Date,
  read: boolean
}

type ChatMessagesType = {
  chatMessages: Message[] 
  setChatMessages: any
}

export const ChatContext = React.createContext<ChatMessagesType>(null)
export const UserContext = React.createContext<UserContextType>(null)
export const OnlineContext = React.createContext<OnlineStateType>(null)
export const OnlinePlayersContext = React.createContext<OnlinePlayersType>(null)