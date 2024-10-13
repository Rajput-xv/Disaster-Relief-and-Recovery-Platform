import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const DataVisualization = () => {
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
    <div>
      <h2>Disaster Relief Efforts Over Time</h2>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="volunteers" stroke="#8884d8" />
        <Line type="monotone" dataKey="donations" stroke="#82ca9d" />
        <Line type="monotone" dataKey="resourcesDistributed" stroke="#ffc658" />
      </LineChart>
    </div>
  );
};

export default DataVisualization;