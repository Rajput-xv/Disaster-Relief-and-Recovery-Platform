import React, { useState, useEffect } from 'react';
import { Typography, Container, List, ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios';

function Resources() {
  const [resources, setResources] = useState([]);

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
    </Container>
  );
}

export default Resources;