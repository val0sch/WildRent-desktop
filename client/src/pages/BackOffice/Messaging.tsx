import { useEffect, useState } from "react";
import socket from "../../Utils/socketService";
import "../../style/messaging.css";
import useAuth from "../../hooks/useAuth";
import { UserCircle } from "@phosphor-icons/react";

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

      // Ajout du message dans listUsers, dans l'objet du user visé et dans le tableau des messages
      setListUsers((prev: any) =>
        prev.map((user: any) =>
          user.userID === userId
            ? { ...user, messages: [...user.messages, messageData] }
            : user
        )
      );

      // Émission du message privé via le socket
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

    // Gestion de l'événement "users" pour mettre à jour la liste des utilisateurs
    socket.on("users", (users: any) => {
      console.log("USERS ====>", users);
      setListUsers(users);
    });

    // Gestion de l'événement "privateMessage" pour mettre à jour la liste des messages privés
    socket.on("privateMessage", ({ messageData, from }) => {
      setListUsers((prev: any) =>
        prev.map((user: any) =>
          user.userID === from
            ? { ...user, messages: [...user.messages, messageData] }
            : user
        )
      );
    });

    // Fonction de nettoyage lors du démontage du composant
    // on peut ajouter autant de socket que l'on souhaite nettoyer,
    // ici, on déconnecte le socket, donc le user lorsqu'il quitte le composant
    return () => {
      socket.disconnect();
    };
  }, [userEmail, setListUsers]);

  const handleSelectedUser = (userEmail: string) => {
    setListUsers((prev: any) =>
      prev.map((user: any) => ({
        ...user,
        isSelected: user.userEmail === userEmail ? !user.isSelected : false,
      }))
    );
  };
  const users = listUsers.filter((user: any) => user.userEmail !== userEmail);

  const userSelected = listUsers.find((user: any) => user.isSelected === true);

  return (
    <div className="messaging-container">
      <div className="list-users">
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
              <div
                className={`message-box ${
                  userInfos.email === message.author ? "box-right" : "box-left"
                }`}
                key={message.message}
              >
                <p>
                  <UserCircle size={20} />
                  {message.author === "admin@admin.fr" ? "You" : message.author}
                </p>

                <p
                  className={`${
                    userInfos.email === message.author ? "you" : "other"
                  }`}
                >
                  {message.message}
                </p>
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
        <p className="no-user">Pas d'utilisateur sélectionné</p>
      )}
    </div>
  );
};

export default Messaging;
