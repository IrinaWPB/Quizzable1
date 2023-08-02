import { io } from "socket.io-client";

//app url
const URL = "https://quizzable-a90200121f06.herokuapp.com/";

export const clientSocketInstance = io(URL);

