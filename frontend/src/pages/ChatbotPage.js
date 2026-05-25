import React from 'react';
import { Container, Typography } from '@mui/material';

const ChatbotPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI Chatbot Assistant
      </Typography>
      <Typography variant="body1">
        Chat with our AI assistant to identify learning gaps and get personalized recommendations.
      </Typography>
    </Container>
  );
};

export default ChatbotPage;
