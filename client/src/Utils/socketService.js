// import io from "socket.io-client";

// export default io("http://localhost:3001");

// ****** initialisation socket.io cote client:
import { io } from "socket.io-client";

const URL = "http://localhost:3001";
// autoConnect is set to false so the connection is not established right away.
// We will manually call socket.connect() later, once the user has selected a username.
const socket = io(URL, { autoConnect: false });

// We also register a catch-all listener, which is very useful during development:
// https://socket.io/docs/v4/listening-to-events/#Catch-all-listeners
socket.onAny((event, ...args) => {
  console.log("event", event, "args", args);
});

export default socket;

// *************
