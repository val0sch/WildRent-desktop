import { useEffect } from "react";
import io from "socket.io-client";
const Messaging = () => {
  const socket = io();

  const sendMessage = () => {
    socket.emit("send_message", { message: "hello" });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);
  return (
    <div>
      <input type="text" placeholder="Message..." />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
};

export default Messaging;
