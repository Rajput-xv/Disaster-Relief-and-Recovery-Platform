import React from 'react';
import { Typography, Container, Grid, Paper } from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Welcome, {user?.username}</Typography>
            {/* Add more user-specific information here */}
          </Paper>
        </Grid>
        {/* Add more dashboard widgets here */}
      </Grid>
    </Container>
  );
}

export default Dashboard;