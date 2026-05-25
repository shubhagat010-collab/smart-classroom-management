import React from 'react';
import { Container, Typography } from '@mui/material';

const AttendancePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Attendance Management
      </Typography>
      <Typography variant="body1">
        Attendance records, reports, and statistics will be displayed here.
      </Typography>
    </Container>
  );
};

export default AttendancePage;
