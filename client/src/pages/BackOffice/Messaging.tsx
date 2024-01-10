import { useEffect, useState } from "react";
import socket from "../../Utils/socketService";
import "../../style/messaging.css";
import useAuth from "../../hooks/useAuth";

export interface UserData {
  userID: string;
  userEmail: string;
  isSelected?: boolean;
  messages?: [];
}
const Messaging = () => {
  const { userInfos } = useAuth();

  const userEmail = userInfos.email;

  const [input, setInput] = useState("");

  const [listUsers, setListUsers] = useState<UserData[] | []>([]);

  const sendMessage = (userId: string) => {
    if (input !== "") {
      const messageData = {
        room: userEmail,
        author: userEmail,
        message: input,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      setListUsers((prev: any) =>
        prev.map((user: any) =>
          user.userID === userId
            ? { ...user, messages: [...user.messages, messageData] }
            : user
        )
      );

      socket.emit("privateMessage", {
        messageData,
        to: userId,
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
      console.log("USERS ====>", users);
      setListUsers(users);
    });

    socket.on("privateMessage", ({ messageData, from }) => {
      console.log("privateMessage", messageData, from);
      setListUsers((prev: any) =>
        prev.map((user: any) =>
          user.userID === from
            ? { ...user, messages: [...user.messages, messageData] }
            : user
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [userEmail, setListUsers]);

  const handleSelectedUser = (userEmail: string) => {
    setListUsers((prev: any) =>
      prev.map((user: any) =>
        user.userEmail === userEmail
          ? { ...user, isSelected: !user.isSelected }
          : user
      )
    );
  };

  useEffect(() => {
    console.log("LIST USERS", listUsers);
  }, [listUsers]);
  const users = listUsers.filter((user: any) => user.userEmail !== userEmail);

  const userSelected = listUsers.find((user: any) => user.isSelected === true);
  console.log(userSelected, "userSelected");
  console.log("listUsers3", listUsers);

  return (
    <div className="messaging-container">
      <div className="list-conversation">
        <ul>
          {users.map((user: any) => (
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

      {userSelected ? (
        <div className="chat-container">
          <div className="messages-container">
            {userSelected?.messages?.map((message: any) => (
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
                event.key === "Enter" && sendMessage(userSelected.userID);
              }}
            />
            <button
              onClick={
                userSelected ? () => sendMessage(userSelected.userID) : () => {}
              }
            >
              Envoyer
            </button>
          </div>
        </div>
      ) : (
        <p>Pas d'utilisateur sélectionné</p>
      )}
    </div>
  );
};

export default Messaging;
