import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "../reactQuery/useUser";

const socket = io("http://localhost:3000");

function LiveChat() {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  console.log(user);
  useEffect(() => {
    socket.emit("register", user ? user.id : null);

    socket.on("chat-message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages, user]);

  const sendMessage = () => {
    socket.emit("send-message", {
      recipientId,
      message: `${user.first_name}: ${message}`,
    });
    setMessage("");
  };

  return (
    <div className="mt-96">
      {messages?.map((message, index) => (
        <div className="w-full bg-blue-100" key={index}>
          {message}
        </div>
      ))}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded-md border px-5 py-2"
      />
      <input
        type="text"
        placeholder="Recipient ID"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        className="mt-2 w-full rounded-md border px-5 py-2"
      />
      <button
        onClick={sendMessage}
        className="rounded-md bg-blue-600 px-5 py-2"
      >
        Send
      </button>
    </div>
  );
}

export default LiveChat;
