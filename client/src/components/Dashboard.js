import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Paper, Button, Card, CardContent } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({ 
    eventsAttended: 0,
    resourcesContributed: 0,
    pointsEarned: 0,
    level: 1
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
        setLatestEvents(eventsResponse.data.slice(0, 5)); // Limit to top 5 latest events
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleViewDetails = (eventId) => {
    // navigate(`/events/${eventId}`);
    navigate(`/events/`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome, {user ? user.username : 'Guest'}!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Role: {user ? user.role : 'N/A'} | Level: {userStats.level}
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
              <Card key={event._id} style={{ marginBottom: 16 }}>
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2">{event.description}</Typography>
                  <Typography variant="body2">Type: {event.type}</Typography>
                  <Typography variant="body2">Date: {new Date(event.date).toLocaleDateString()}</Typography>
                  <Typography variant="body2">Location: {event.location.coordinates.join(', ')}</Typography>
                  <Typography variant="body2">Capacity: {event.capacity}</Typography>
                  <Typography variant="body2">Registered Participants: {event.registeredParticipants.length}</Typography>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#1976d2", color: "white" }} 
                    onClick={() => handleViewDetails(event._id)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;