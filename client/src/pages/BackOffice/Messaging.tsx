import { useEffect, useState } from "react";
import socket from "../../Utils/socketService";
import "../../style/messaging.css";
import useAuth from "../../hooks/useAuth";

interface UserData {
  userID: string;
  userEmail: string;
  isSelected?: boolean;
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
      console.log(messageData, messageData, users[0].userID);
      socket.emit("privateMessage", {
        messageData,
        to: users[0].userID,
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

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("privateMessage", ({ messageData, from }) => {
      console.log("messageData", messageData, "from", from);
      if (from === "gswEeqfCTXfTesbMAAAD") {
        const lastMessageReceived = messageReceived.slice(0);
        if (messageData.message === lastMessageReceived) return;
        else setMessageReceived((prev: any) => [...prev, messageData]);
      }
    });
  }, [messageReceived, userEmail, listUsers]);

  const users = listUsers.filter((user) => user.userEmail !== userEmail);

  const handleSelectedUser = (userEmail: string) => {
    setListUsers((prev: any) =>
      prev.map((user: any) =>
        user.userEmail === userEmail
          ? { ...user, isSelected: !user.isSelected }
          : user
      )
    );
  };

  return (
    <div className="messaging-container">
      <div className="list-conversation">
        <ul>
          {users.map((user) => (
            <li key={user.userEmail}>
              <button
                className={`emailUser-btn ${user.isSelected && "selected"}`}
                onClick={() => handleSelectedUser(user.userEmail)}
              >
                {user.userEmail}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-container">
        <div className="messages-container">
          {messageReceived &&
            messageReceived.map((message: any) => (
              <div className="message-box" key={message.message}>
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
