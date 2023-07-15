import { io } from "socket.io-client";

const URL = "http://localhost:3001";

export const clientSocketInstance = io(URL);

