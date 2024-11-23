import React, { useState, useEffect } from 'react';
import { Typography, Container, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import DonationForm from './DonationForm';

function Resources() {
  const [resources, setResources] = useState([]);
  const [showDonationForm, setShowDonationForm] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('/api/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    fetchResources();
  }, []);

  const handleDonationSuccess = (donation) => {
    console.log('Donation successful:', donation);
    setShowDonationForm(false);
  };

  return (
    <Container>
      <Typography variant="h4">Resources</Typography>
      <List>
        {resources.map((resource) => (
          <ListItem key={resource._id}>
            <ListItemText
              primary={resource.name}
              secondary={`Type: ${resource.type}, Quantity: ${resource.quantity}`}
            />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={() => setShowDonationForm(true)}>
        Donate
      </Button>
      {showDonationForm && <DonationForm onDonationSuccess={handleDonationSuccess} />}
    </Container>
  );
}

export default Resources;