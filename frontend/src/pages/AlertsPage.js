import React from 'react';
import { Container, Typography } from '@mui/material';

const AlertsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Safety & Security Alerts
      </Typography>
      <Typography variant="body1">
        Real-time alerts and incident logs will be displayed here.
      </Typography>
    </Container>
  );
};

export default AlertsPage;
