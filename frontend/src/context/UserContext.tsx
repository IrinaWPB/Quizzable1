import React from "react"
import { UserData } from "../types/user"

type UserContextType = {
  currentUser: UserData | null;
}

type OnlineStateType = {
  online: boolean
  setOnlineStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

type OnlinePlayersType = {
  onlinePlayers: {
    [key: string] : string
  }
  setOnlinePlayers: React.Dispatch<React.SetStateAction<{}>>
}

export const UserContext = React.createContext<UserContextType>(null)
export const OnlineContext = React.createContext<OnlineStateType>(null)
export const OnlinePlayersContext = React.createContext<OnlinePlayersType>(null)