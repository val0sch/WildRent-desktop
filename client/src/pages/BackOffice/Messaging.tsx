import { useEffect, useState } from "react";
import socket from "../../Utils/socketService";
const Messaging = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<any>([]);
  const [messageReceived, setMessageReceived] = useState<string[]>([]);
  const sendMessage = () => {
    // setConversation((prev: any) => [...prev, input]);
    socket.emit("send_message", conversation);
    setInput("");
    console.log("yo");
    console.log("input", input);
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("receive_message", data);
      // setMessageReceived((prev) => [...prev, data]);
    });
  }, [socket]);
  console.log(socket.id);
  console.log(input);
  console.log(conversation);
  console.log(messageReceived);
  return (
    <div>
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

      {messageReceived.map((newMessage) => (
        <ul>
          <li>{newMessage}</li>
        </ul>
      ))}
    </div>
  );
};

export default Messaging;
