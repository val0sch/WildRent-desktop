import { useEffect, useState } from "react";
import socket from "../../Utils/socketService";
import "../../style/messaging.css";
import useAuth from "../../hooks/useAuth";
const Messaging = () => {
  const { userInfos } = useAuth();
  const [input, setInput] = useState("");
  const [messageReceived, setMessageReceived] = useState<any>([]);
  const sendMessage = () => {
    if (input !== "") {
      const messageData = {
        room: userInfos.email,
        author: userInfos.email,
        message: input,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("send_message", messageData);
      setMessageReceived((prev: any) => [...prev, messageData]);
    }
    setInput("");
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((prev: any) => [...prev, data]);
    });
  }, [socket]);

  console.log(messageReceived);
  return (
    <div className="container">
      <div className="list-conversation">Liste des Discussions</div>
      <div className="chat-container">
        <div className="messages-container">
          {messageReceived &&
            messageReceived.map((message: any) => (
              <div className="message-box">
                <p>{message.author}</p>
                <p>{message.message}</p>
                <p>{message.time}</p>
              </div>
            ))}
        </div>
        <div className="writing-box">
          <input
            type="text"
            placeholder="Message..."
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            onKeyDown={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>Envoyer</button>
        </div>{" "}
      </div>
    </div>
  );
};

export default Messaging;
