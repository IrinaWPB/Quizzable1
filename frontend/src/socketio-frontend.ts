import { io } from "socket.io-client";

//Production URL
//const URL = "https://quizzable-a90200121f06.herokuapp.com/"; 

//Dev & testing
const URL = "http://localhost:3001";

export const clientSocketInstance = io(URL);

