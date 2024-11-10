import React from 'react';
import { Typography, Container } from '@mui/material';

function Home() {
  return (
    <Container>
      <Typography variant="h2">Welcome to Disaster Relief Platform</Typography>
      <Typography variant="body1">
        Our platform helps coordinate disaster relief efforts, manage resources, and build community resilience.
      </Typography>
    </Container>
  );
}

export default Home;