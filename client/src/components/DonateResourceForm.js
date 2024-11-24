import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography, Container, Grid } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const essentialItems = [
  'Water',
  'Food',
  'Clothing',
  'Medical Supplies',
  'Shelter Materials',
  'Hygiene Kits',
  'Tools',
  'Blankets'
];

const ResourceDonationForm = ({ onDonationSuccess }) => {
  const { user } = useAuth(); // Get the current user from the authentication context
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem || !quantity) {
      setError('Please select an item and enter a quantity.');
      return;
    }

    try {
      const response = await axios.post('/api/resources', {
        item: selectedItem,
        quantity: parseInt(quantity, 10)
      }, {
        headers: {
          Authorization: `Bearer ${user.token}` // Include the token in the request headers
        }
      });

      onDonationSuccess(response.data);
    } catch (error) {
      setError('Error processing donation');
      console.error('Error making donation:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }} style={{ marginTop: '20px' }} >Make a Donation</Typography>
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="item-label">Select Item</InputLabel>
          <Select
            labelId="item-label"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            sx={{ mb: 2 }}
            required
          >
            {essentialItems.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Donate
        </Button>
      </form>
    </Container>
  );
};

export default ResourceDonationForm;