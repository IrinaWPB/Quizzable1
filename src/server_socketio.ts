import { Server as IOServer } from "socket.io";
import type { Server as HTTPServer } from "http";

type OnlinePlayers = {
  [key: string]: string
}

let onlinePlayers: OnlinePlayers = {}
let player1: string;
let player2: string;

//Define Socket Server Class
export default class SocketIOServer {
  private io: IOServer;
  constructor(server: HTTPServer) {
    this.io = new IOServer(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
  }
  
  public init(): void {
    this.listeners();
  } 

  private listeners(): void {

    //start listening for emitters when connection is on
    this.io.on("connection", (socket) => {
      console.log("client connected");
      console.log(socket.id);

      // adds user to online players list when user clicks "go_online"
      socket.on("go_online", (data) => {
        onlinePlayers[socket.id] = data.username ;
        socket.emit("online", "you are online");
        console.log('onlinePlayers:', onlinePlayers);
        // emit to everyone the new number of online players //
        this.io.emit("updated_online_players", { players_online: onlinePlayers });
      })
      
      //removes user from online players list when user clicks "go_offline"
      socket.on("go_offline", () => {
        delete onlinePlayers[socket.id]
        socket.emit("offline", "you are offline");
        console.log(onlinePlayers);
        // emit to everyone the new number of online players //
        this.io.emit("updated_online_players", { players_online: onlinePlayers});
      })

      /** when user clicks "invite" and picks a player 
       * app assignes users ids to online player1 and online player2" 
       */
      socket.on("send_invitation", (data) => {
        player1 = data.toId
        player2 = data.fromId
        //emits to the opponent(sends invitation)
        socket.to(player1).emit('invitation', { invitation_from: player2 })
      })
      
      /** when user clicks "join game" 
       * app emits prompt to start a game to both players
       * and game starts
       */
      socket.on("join_game", (data) =>{
        socket.to(data.toId).emit('start_game', { you: data.toId, opponent: onlinePlayers[data.fromId]}) 
        socket.emit('start_game', { you: data.fromId, opponent: onlinePlayers[data.toId]})
      }) 

      //when score changes, new score is emitted and updated for both users
      socket.on("score_update", (data) => {
        socket.emit("new_score", { score: data.newScore })
        if (player1 === data.userId ) {
          socket.to(player2).emit("opponent_new_score", { score: data.newScore})
        } else {
          socket.to(player1).emit("opponent_new_score", { score: data.newScore})
        }
      })

      socket.on("start_chat", (data) => {
        player1 = data.toId
        player2 = data.fromId
        console.log(player1, player2)
      })

      socket.on("new_chat_message", (data) => {
        if (player1 === data.playerId) {
          socket.to(player2).emit('new_message', { message: data.chatMessage, sender: onlinePlayers[player1] })
        } else if (player2 === data.playerId) {
          socket.to(player1).emit('new_message', { message: data.chatMessage, sender: onlinePlayers[player2] })
        }
      })

    });
  }
}