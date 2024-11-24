import React, { useState, useEffect } from 'react';
import { Typography, Container, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import DonationForm from '../components/DonationForm';
import ResourceDonationForm from '../components/DonateResourceForm';

function Resources() {
  const [resources, setResources] = useState([]);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showResourceDonationForm, setShowResourceDonationForm] = useState(false);

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
    setShowResourceDonationForm(false);
  };

  const handleShowDonationForm = () => {
    setShowDonationForm(true);
    setShowResourceDonationForm(false);
  };

  const handleShowResourceDonationForm = () => {
    setShowResourceDonationForm(true);
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
      <Button variant="contained" color="primary" onClick={handleShowDonationForm}>
        Donate Money
      </Button>
      <Button variant="contained" color="secondary" onClick={handleShowResourceDonationForm} style={{ marginLeft: '20px' }}>
        Donate Resource
      </Button>
      {showDonationForm && <DonationForm onDonationSuccess={handleDonationSuccess} />}
      {showResourceDonationForm && <ResourceDonationForm onDonationSuccess={handleDonationSuccess} />}
    </Container>
  );
}

export default Resources;