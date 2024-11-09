import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Paper, Button } from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

function Dashboard() {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState({ 
    eventsAttended: 0,
    resourcesContributed: 0,
    pointsEarned: 0,
  });
  const [latestEvents, setLatestEvents] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, eventsResponse] = await Promise.all([
          api.get('/user/stat'), 
          api.get('/events/latest'), 
        ]);
        setUserStats(statsResponse.data);
        setLatestEvents(eventsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome, {user ? user.username : 'Guest'}!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Role: {user ? user.role : 'N/A'}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Your Stats</Typography>
            <Typography>Events Attended: {userStats.eventsAttended}</Typography>
            <Typography>Resources Contributed: {userStats.resourcesContributed}</Typography>
            <Typography>Points Earned: {userStats.pointsEarned}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h6">Upcoming Events</Typography>
            {latestEvents.map((event) => (
              <div key={event._id} style={{ marginBottom: '8px' }}>
                <Typography variant="subtitle1">{event.title}</Typography>
                <Typography variant="body2">
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Button variant="outlined" size="small" color="primary">
                  View Details
                </Button>
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;