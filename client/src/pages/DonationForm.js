import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';

function DonationForm({ onDonationSuccess, currentUserId }) {
  const [donor, setDonor] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [error, setError] = useState('');

  const currencies = [
    { code: 'INR', label: 'Indian Rupee (₹)' },
    { code: 'USD', label: 'US Dollar ($)' },
    { code: 'EUR', label: 'Euro (€)' },
    { code: 'GBP', label: 'British Pound (£)' }
  ];

  const verifyUser = async (username) => {
    try {
      const response = await axios.get(`/api/users/verify/${username}`);
      console.log('Verify user response:', response.data);
      return response.data.isValid;
    } catch (error) {
      console.error('Error verifying user:', error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // First verify if donor username matches current user
      const isValidUser = await verifyUser(donor);

      if (!isValidUser || donor !== currentUserId) {
        setError('Invalid donor username or unauthorized user');
        return;
      }

      // Proceed with donation if user is verified
      const response = await axios.post('/api/donations', {
        donor,
        amount,
        currency,
        userId: currentUserId
      });
      
      onDonationSuccess(response.data);
    } catch (error) {
      setError('Error processing donation');
      console.error('Error making donation:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>Make a Donation</Typography>
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Donor/User ID"
          value={donor}
          onChange={(e) => setDonor(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <Select
          fullWidth
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          sx={{ mb: 2 }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained" color="primary">
          Donate
        </Button>
      </form>
    </Container>
  );
}

export default DonationForm;