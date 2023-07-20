import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { useEffect, useState } from "react";

configureAbly({
  key: "DuUOOw.XrX9_A:kGOm0BRk6jVKod6bj9zimGuUBJw28_tamxKZZAFgqK4",
  clientId: Date.now() + "",
});

export default function Home() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(Array);
  const [prevMessages, setPrevMessages] = useState(Array);

  const [channel] = useChannel("public-chat", (message) => {
    setMessages((prev) => [...prev, message]);
  });

  async function sendMessage() {
    channel.publish("message", { text, date: Date.now() });
    setText("");
    fetch("http://localhost:3000/api/messages", {
      method: "POST",
      body: text,
    });
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/messages", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPrevMessages(data.documents);
      });
  }, [messages, prevMessages]);
  async function remove(id: number) {
    fetch(`http://localhost:3000/api/messages/${id}`, {
      method: "DELETE",
    });
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ height: 50, width: 200 }}
        ></input>
        <button onClick={sendMessage} style={{ height: 50, width: 50 }}>
          send
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {prevMessages &&
          prevMessages.map((message: any) => (
            <div
              onClick={() => remove(message._id)}
              key={message._id}
              style={{
                height: 50,
                width: 250,
                backgroundColor: "white",
                margin: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
            >
              {message.text}
            </div>
          ))}
        {messages &&
          messages.map((message: any) => (
            <div
              onClick={() => remove(message._id)}
              key={message.id}
              style={{
                height: 50,
                width: 250,
                backgroundColor: "white",
                margin: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
            >
              {message.data.text}
            </div>
          ))}
      </div>
    </div>
  );
}
