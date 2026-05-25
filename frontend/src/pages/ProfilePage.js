import React from 'react';
import { Container, Typography } from '@mui/material';

const ProfilePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="body1">
        View and manage your profile information here.
      </Typography>
    </Container>
  );
};

export default ProfilePage;
