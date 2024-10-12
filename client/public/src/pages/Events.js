import React, { useState, useEffect } from 'react';
import { Typography, Container, Card, CardContent, Button } from '@material-ui/core';
import axios from 'axios';

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      await axios.post(`/api/events/${eventId}/register`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Refresh events after registration
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Events</Typography>
      {events.map((event) => (
        <Card key={event._id} style={{ marginBottom: 16 }}>
          <CardContent>
            <Typography variant="h6">{event.title}</Typography>
            <Typography variant="body2">{event.description}</Typography>
            <Typography variant="body2">Date: {new Date(event.date).toLocaleDateString()}</Typography>
            <Button variant="contained" color="primary" onClick={() => handleRegister(event._id)}>
              Register
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Events;