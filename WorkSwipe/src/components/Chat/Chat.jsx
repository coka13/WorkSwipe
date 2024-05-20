import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Conversation = (firstUserId,secondUserId) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 1000); // update every second

    return () => {
      clearInterval(intervalId);
    };
  }, [firstUserId, secondUserId]);

  const fetchMessages = () => {
    axios.get('/messages', {
      params: {  firstUserId: firstUserId, secondUserId: secondUserId },
    })
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, ...response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    axios.post('/messages', {
      firstUserId: firstUserId,
      secondUserId: secondUserId,
      message: newMessage,
    })
      .then((response) => {
        setNewMessage('');
        fetchMessages();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div>
      <h1>Conversation with {secondUserId}</h1>
      <form onSubmit={handleSendMessage}>
        <input type="text" value={newMessage} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Conversation;