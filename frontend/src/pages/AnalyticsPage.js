import React from 'react';
import { Container, Typography } from '@mui/material';

const AnalyticsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Analytics & Insights
      </Typography>
      <Typography variant="body1">
        Detailed analytics, charts, and reports will be displayed here.
      </Typography>
    </Container>
  );
};

export default AnalyticsPage;
