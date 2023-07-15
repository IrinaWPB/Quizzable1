import { Server as IOServer } from "socket.io";
//
import type { Server as HTTPServer } from "http";

type OnlinePlayers = {
  [key: string]: string
}

let onlinePlayers: OnlinePlayers = {}
let player1: string;
let player2: string;

export default class SocketIOServer {
  private io: IOServer;
  constructor(server: HTTPServer) {
    this.io = new IOServer(server, { cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] } });
  }
  
  public init(): void {
    this.listeners();
  } 
  private listeners(): void {
    this.io.on("connection", (socket) => {
      console.log("client connected");
      console.log(socket.id);
      socket.on("go_online", (data) => {
        onlinePlayers[socket.id] =  data.username ;
        socket.emit("online", "you are online");
        console.log('onlinePlayers:', onlinePlayers);
        // emit to everyone the new number of online players //
        this.io.emit("updated_online_players", { players_online: onlinePlayers });
      })

      socket.on("go_offline", () => {
        delete onlinePlayers[socket.id]
        socket.emit("offline", "you are offline");
        console.log(onlinePlayers);
        // emit to everyone the new number of online players //
        this.io.emit("updated_online_players", { players_online: onlinePlayers});
      })
      socket.on("send_invitation", (data) => {
        player1 = data.toId
        player2 = data.fromId
        console.log('player1', player1, 'player2', player2)
        socket.to(player1).emit('invitation', { invitation_from: player2 })
      })

      socket.on("join_game", (data) =>{
        console.log("sending 'start_game' to", data.toId )
        socket.to(data.toId).emit('start_game', { you: data.toId, opponent: onlinePlayers[data.fromId]}) 
        console.log("sending 'start_game' to", data.fromId )  
        socket.emit('start_game', { you: data.fromId, opponent: onlinePlayers[data.toId]})
      }) 

      socket.on("score_update", (data) => {
        console.log(data.newScore)
        socket.emit("new_score", { score: data.newScore })
        if (player1 === data.userId ) {
          socket.to(player2).emit("opponent_new_score", { score: data.newScore})
        } else {
          socket.to(player1).emit("opponent_new_score", { score: data.newScore})
        }
      })
      
    });
  }
}