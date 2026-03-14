/* eslint-disable */


import React, { useState, useEffect } from 'react';
import Chart from './components/Chart';
import Controls from './components/Controls';
import axios from 'axios';

function App() {
  const [actuals, setActuals] = useState([]);
  const [forecasts, setForecasts] = useState([]);
  const [startDate, setStartDate] = useState('2024-01-24');
const [endDate, setEndDate] = useState('2024-01-25');
  const [horizon, setHorizon] = useState(4);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchData();
  }, [startDate, endDate, horizon]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const [actualsRes, forecastsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/actuals?from=${startDate}&to=${endDate}`),
        axios.get(`http://localhost:5000/api/forecasts?from=${startDate}&to=${endDate}`)
      ]);

      // Process actuals
      const actualsData = actualsRes.data.map(item => ({
        time: item.startTime,
        value: item.generation
      }));

      // Process forecasts - filter by horizon
      const forecastsData = forecastsRes.data
        .filter(item => {
          const targetTime = new Date(item.startTime);
          const publishTime = new Date(item.publishTime);
          const diffHours = (targetTime - publishTime) / (1000 * 60 * 60);
          return diffHours >= horizon && diffHours <= 48;
        })
        .map(item => ({
          time: item.startTime,
          value: item.generation
        }));

      setActuals(actualsData);
      setForecasts(forecastsData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>🌬️ UK Wind Power Forecast Monitor</h1>

      <Controls
        startDate={startDate}
        endDate={endDate}
        horizon={horizon}
        onStartChange={setStartDate}
        onEndChange={setEndDate}
        onHorizonChange={setHorizon}
      />

      {loading ? (
        <p style={{ fontSize: '18px' }}>⏳ Loading data...</p>
      ) : (
        <Chart actuals={actuals} forecasts={forecasts} />
      )}
    </div>
  );
}

export default App;
