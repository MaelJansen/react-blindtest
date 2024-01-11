import React from "react";
import { useState, useEffect, useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form, Input, Feed } from "semantic-ui-react";
import Message from "./Message";
import MessageBroadcast from "./MessageBroadcast";
import { SocketContext } from "./context/SocketContext";
import { PlayerContext } from "./context/PlayerContext";

export default function Tchat() {
  const socket = useContext(SocketContext);
  const { username, room } = useContext(PlayerContext);
  if (!socket) {
    console.log("socket is null");
  }
  const [messagesReceived, setMessagesReceived] = useState([]);

  const submitMessage = () => {
    const message = document.getElementById("message").value;
    if (message.trim() === "") {
      return; // Do not send empty message
    }

    document.getElementById("message").value = "";
    const __createdtime__ = Date.now();
    socket.emit("send_message", { message, username, room, __createdtime__ });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          broadcast: data.broadcast,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
      const chatContainer = document.getElementById("chatContainer");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    });
    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <div>
      <Feed id="chatContainer" style={{ overflowY: "scroll", height: "30vh" }}>
        {messagesReceived.map((message, index) =>
          message.broadcast ? (
            <MessageBroadcast
              key={index}
              message={message.message}
              username={message.username}
              __createdtime__={message.__createdtime__}
            />
          ) : (
            <Message
              key={index}
              message={message.message}
              username={message.username}
              __createdtime__={message.__createdtime__}
            />
          )
        )}
      </Feed>
      <Form.Field
        style={{ paddingTop: "1em" }}
        autoComplete="off"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            submitMessage();
          }
        }}
      >
        <Input
          id="message"
          fluid
          placeholder="Dites quelque chose"
          icon="paper plane"
        />
      </Form.Field>
    </div>
  );
}
