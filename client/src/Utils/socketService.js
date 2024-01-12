// ****** initialisation socket.io côté client:
import { io } from "socket.io-client";

const URL = "http://localhost:3001";

const socket = io(URL, { autoConnect: false });

// listener that catch all events, very useful during development:
socket.onAny((event, ...args) => {
  console.log("event", event, "args", args);
});

export default socket;
