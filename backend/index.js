const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: '✅ Backend running!' });
});

// ✅ Actual wind generation
app.get('/api/actuals', async (req, res) => {
  try {
    const from = req.query.from || '2024-01-24';
    const to = req.query.to || '2024-01-25';

    const url = `https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELHH/stream?settlementDateFrom=${from}&settlementDateTo=${to}&fuelType=WIND&format=json`;
    console.log('Actuals URL:', url);

    const response = await axios.get(url);
    console.log('✅ Actuals count:', response.data?.length);
    console.log('✅ Actuals sample:', response.data?.slice?.(0,1));
    res.json(response.data);
  } catch (err) {
    console.error('Actuals error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Forecasted wind generation
app.get('/api/forecasts', async (req, res) => {
  try {
    const from = req.query.from || '2024-01-24';
    const to = req.query.to || '2024-01-25';

const url = `https://data.elexon.co.uk/bmrs/api/v1/datasets/WINDFOR/stream?publishDateTimeFrom=2024-01-01T00:00:00Z&publishDateTimeTo=${to}T23:59:59Z&format=json`;    console.log('Forecasts URL:', url);

    const response = await axios.get(url);
    console.log('✅ Forecasts count:', response.data?.length);
    console.log('✅ Forecasts sample:', response.data?.slice?.(0,1));
    res.json(response.data);
  } catch (err) {
    console.error('Forecasts error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});