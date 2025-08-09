import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import chatService from "../../services/chatService";
import "./Conversation.css";

const Conversation = ({ user1, user2 }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const currentUser = useSelector((state) => state.auth);
  const pollRef = useRef(null);

  useEffect(() => {
    initializeConversation();
    return () => {
      if (pollRef.current) {
        pollRef.current();
      }
    };
  }, [user2]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeConversation = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get or create conversation with admin
      const conv = await chatService.getOrCreateConversation(
        user2._id,
        'Admin',
        'support'
      );
      
      setConversation(conv);
      
      // Load initial messages
      const initialMessages = await chatService.getMessages(conv._id);
      setMessages(formatMessages(initialMessages));
      
      // Start polling for new messages
      pollRef.current = chatService.startPolling(conv._id, (newMessages) => {
        setMessages(formatMessages(newMessages));
      }, 3000);
      
    } catch (err) {
      console.error('Failed to initialize conversation:', err);
      setError('Failed to connect to support. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatMessages = (messageArray) => {
    return messageArray.map(msg => {
      const isPersonal = msg.senderId === currentUser._id || 
                        (msg.senderId && msg.senderId._id === currentUser._id);
      
      return {
        _id: msg._id,
        text: msg.message,
        personal: isPersonal,
        timestamp: formatTime(msg.timestamp),
        sender: isPersonal ? currentUser : user2,
        messageType: msg.messageType
      };
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const insertMessage = async () => {
    if (input.trim() === "" || !conversation || sending) {
      return;
    }

    setSending(true);
    const messageText = input;
    setInput("");

    try {
      // Add message to UI immediately for better UX
      const tempMessage = {
        _id: Date.now(),
        text: messageText,
        personal: true,
        timestamp: formatTime(new Date()),
        sender: currentUser,
        sending: true
      };
      
      setMessages(prev => [...prev, tempMessage]);

      // Send message to backend
      await chatService.sendMessage(
        conversation._id,
        user2._id,
        'Admin',
        messageText
      );

      // Remove temporary message and reload from server
      const updatedMessages = await chatService.getMessages(conversation._id);
      setMessages(formatMessages(updatedMessages));

    } catch (err) {
      console.error('Failed to send message:', err);
      // Remove the temporary message on error
      setMessages(prev => prev.filter(msg => msg._id !== Date.now()));
      setInput(messageText); // Restore input
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="chat">
        <div className="chat-title">
          <h1>Connecting...</h1>
          <h2>Please wait</h2>
          <div className="avatar">
            <div className="loading-avatar">💬</div>
          </div>
        </div>
        <div className="messages">
          <div className="loading-container">
            <div className="loading-spinner">⏳</div>
            <p>Connecting to support...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chat">
        <div className="chat-title error-state">
          <h1>Connection Error</h1>
          <h2>Support Unavailable</h2>
          <div className="avatar">
            <div className="error-avatar">❌</div>
          </div>
        </div>
        <div className="messages">
          <div className="error-container">
            <p>{error}</p>
            <button className="retry-button" onClick={initializeConversation}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="chat">
        <div className="chat-title">
          <h1>{user2.name || 'WorkSwipe Support'}</h1>
          <h2>Admin Support • {conversation?.supportTicketId ? `Ticket: ${conversation.supportTicketId.split('-')[1]}` : 'Live Chat'}</h2>
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
                key={msg._id || index}
                className={`message ${
                  msg.personal ? "message-personal" : "new"
                } ${msg.sending ? "sending" : ""} ${msg.messageType === 'support' ? 'support-message' : ''}`}
              >
                {!msg.personal && !msg.sending && (
                  <figure className="avatar">
                    <img
                      src={user2.url}
                      alt="avatar"
                    />
                  </figure>
                )}
                {msg.text}
                {msg.timestamp && (
                  <div className="timestamp">
                    {msg.timestamp}
                    {msg.sending && ' • Sending...'}
                  </div>
                )}
              </div>
            ))}
            
            {sending && (
              <div className="message new loading">
                <figure className="avatar">
                  <img src={user2.url} alt="avatar" />
                </figure>
                <span></span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="message-box">
          <textarea
            className="message-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                insertMessage();
              }
            }}
            disabled={sending}
          ></textarea>
          <button
            type="submit"
            className={`message-submit ${sending ? 'sending' : ''}`}
            onClick={insertMessage}
            disabled={sending || input.trim() === ""}
          >
            {sending ? '⏳' : '📤'}
          </button>
        </div>
      </div>
      <div className="bg"></div>
    </>
  );
};

export default Conversation;
