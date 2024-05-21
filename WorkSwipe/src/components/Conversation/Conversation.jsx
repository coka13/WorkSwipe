import React, { useState, useEffect, useRef } from "react";
import "./Conversation.css";
import { getUserRole } from "../../utils/getUserRole";

const Conversation = (user1, user2) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  let i = 0;

  useEffect(() => {
    setTimeout(fakeMessage, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const setDate = () => {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const timestamp = `${h}:${m < 10 ? "0" : ""}${m}`;
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      if (newMessages.length > 0) {
        newMessages[newMessages.length - 1].timestamp = timestamp;
      }
      return newMessages;
    });
  };

  const insertMessage = () => {
    if (input.trim() === "") {
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, personal: true },
    ]);
    setInput("");
    setDate();
    setTimeout(fakeMessage, 1000 + Math.random() * 2000);
  };

  const Fake = [
    "Hi there, I'm Fabio and you?",
    "Nice to meet you",
    "How are you?",
    "Not too bad, thanks",
    "What do you do?",
    "That's awesome",
    "Codepen is a nice place to stay",
    "I think you're a nice person",
    "Why do you think that?",
    "Can you explain?",
    "Anyway I've gotta go now",
    "It was a pleasure chat with you",
    "Time to make a new codepen",
    "Bye",
    ":)",
  ];

  const fakeMessage = () => {
    if (input !== "") {
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "", loading: true },
    ]);

    setTimeout(() => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.pop();
        newMessages.push({ text: Fake[i], loading: false });
        i++;
        return newMessages;
      });
      setDate();
    }, 1000 + Math.random() * 2000);
  };

  return (
    <>
      <div className="chat">
        <div className="chat-title">
          <h1>{user2.name}</h1>
          <h2>{getUserRole(user2)}</h2>
          <figure className="avatar">
            <img
              src={user2.url}
              alt="avatar"
            />
          </figure>
        </div>
        <div className="messages">
          <div className="messages-content">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.personal ? "message-personal" : "new"
                } ${msg.loading ? "loading" : ""}`}
              >
                {!msg.personal && !msg.loading && (
                  <figure className="avatar">
                    <img
                      src={user2.url}
                      alt="avatar"
                    />
                  </figure>
                )}
                {msg.text}
                {msg.timestamp && (
                  <div className="timestamp">{msg.timestamp}</div>
                )}
                {msg.loading && <span></span>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="message-box">
          <textarea
            type="text"
            className="message-input"
            placeholder="Type message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                insertMessage();
              }
            }}
          ></textarea>
          <button
            type="submit"
            className="message-submit"
            onClick={insertMessage}
          >
            Send
          </button>
        </div>
      </div>
      <div className="bg"></div>
    </>
  );
};

export default Conversation;
