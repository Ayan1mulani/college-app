import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import fetchGetData from '../Client/Clinet';

const MessageScreen = ({ onClose, senderType = 'Teacher' }) => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref for scrolling

  const displayTime = (isoTimestamp) => {
    const date = new Date(isoTimestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetchGetData(`/view/api/messages`);
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        setMessages([]);
      }
    };

    fetchMessages();

    const socket = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      client.subscribe('/topic/messages', (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    }, (error) => {
      console.error('WebSocket error: ', error);
    });

    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && newMessage) {
      const message = {
        content: newMessage,
        sender: senderType,
        timestamp: new Date().toISOString(),
      };
      stompClient.send('/app/chat', {}, JSON.stringify(message));
      setNewMessage('');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div id='msg-screen' className="msg-screen">
      <div className='nav-width'>
        <div id='nav-msg-screen'>
          <p>Message Screen</p>
        </div>
        <div>
          <Fab size='small' color="black" className='close' onClick={onClose}>
            <CloseIcon />
          </Fab>
        </div>
      </div>

      <div className='messages-container'>
        <div className="chat-box">
          <div className="messages-list">
            {messages.map((msg, index) => (
              <div key={index} className="message-item">
                <div className='style-box'>
                  <li>
                    <p><strong>{msg.sender}:</strong> {msg.content}</p>
                    <p className="timestamp">{displayTime(msg.timestamp)}</p>
                  </li>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Dummy div to ensure scroll to bottom */}
          </div>
        </div>
      </div>

      <div className='flex send-box'>
        <input
          type="text"
          className='input'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type Your Message...'
        />
        <Button variant="contained" onClick={sendMessage} size='large' endIcon={<SendIcon />}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageScreen;