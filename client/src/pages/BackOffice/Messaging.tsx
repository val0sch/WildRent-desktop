import { useEffect, useState } from "react";
import socket from "../../Utils/socketService";
import "../../style/messaging.css";
import useAuth from "../../hooks/useAuth";

interface UserData {
  userID: string;
  userEmail: string;
}
const Messaging = () => {
  const { userInfos } = useAuth();
  const [input, setInput] = useState("");
  const [messageReceived, setMessageReceived] = useState<any>([]);
  const userEmail = userInfos.email;
  const [listUsers, setListUsers] = useState<UserData[] | []>([]);
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
      setMessageReceived((prev: any) => [...prev, messageData]);

      socket.emit("privateMessage", {
        messageData,
        to: "BmjMCVvbpbC3ZczzAAAL",
      });
    }
    setInput("");
  };

  useEffect(() => {
   
    socket.auth = { userEmail };
    socket.connect();
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.log("big error ", err.message);
      }
    });
    // We register a handler for the users event:
    socket.on("users", (users: any) => {
      setListUsers(users);
    });

    socket.on("privateMessage", ({ messageData, from }) => {
      console.log(messageData, from);
      if (from === "BmjMCVvbpbC3ZczzAAAL") {
        const lastMessageReceived = messageReceived.slice(0);
        if (messageData.message === lastMessageReceived) return;
        else setMessageReceived((prev: any) => [...prev, messageData]);
      }
    });

    return () => {
      socket.off("connect_error");
      socket.off("privateMessage");
    };
  }, [messageReceived, userEmail]);
  return (
    <div className="container">
      <div className="list-conversation">
        <ul>
          {listUsers.map((user) => (
            <li key={user.userEmail}>{user.userEmail}</li>
          ))}
        </ul>
      </div>
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
