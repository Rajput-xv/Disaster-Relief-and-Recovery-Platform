import React, { useState, useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function DataVisualization() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data/visualization');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Data Visualization</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="volunteers" stroke="#8884d8" />
          <Line type="monotone" dataKey="donations" stroke="#82ca9d" />
          <Line type="monotone" dataKey="resourcesDistributed" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default DataVisualization;