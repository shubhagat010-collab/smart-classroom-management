import React from 'react';
import { Container, Typography } from '@mui/material';

const ResourcesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resource Management
      </Typography>
      <Typography variant="body1">
        Manage classroom resources, schedules, and maintenance here.
      </Typography>
    </Container>
  );
};

export default ResourcesPage;
