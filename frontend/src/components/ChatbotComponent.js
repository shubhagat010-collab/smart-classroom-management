import React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chatbot/message`,
        {
          message: input,
          studentId: JSON.parse(localStorage.getItem('user'))?.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiMessage = {
        role: 'assistant',
        content: response.data.data.aiResponse,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
      <Paper
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: 2,
          marginBottom: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        {messages.length === 0 ? (
          <Typography align="center" color="textSecondary">
            Start a conversation with the AI assistant
          </Typography>
        ) : (
          messages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                marginBottom: 2,
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Paper
                sx={{
                  padding: 1.5,
                  maxWidth: '70%',
                  backgroundColor: msg.role === 'user' ? '#1976d2' : '#e0e0e0',
                  color: msg.role === 'user' ? 'white' : 'black',
                }}
              >
                <Typography variant="body2">{msg.content}</Typography>
              </Paper>
            </Box>
          ))
        )}
      </Paper>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatbotComponent;
