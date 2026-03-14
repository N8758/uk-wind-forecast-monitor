import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function Chart({ actuals, forecasts }) {

  const allTimes = [...new Set([
    ...actuals.map(d => d.time),
    ...forecasts.map(d => d.time)
  ])].sort();

  const chartData = allTimes.map(time => {
    const actual = actuals.find(d => d.time === time);

    // ✅ Match forecast within 30 min window
    const forecast = forecasts.find(d => {
      const diff = Math.abs(new Date(d.time) - new Date(time));
      return diff <= 30 * 60 * 1000;
    });

    return {
      time: new Date(time).toLocaleString('en-GB', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      }),
      Actual: actual ? Math.round(actual.value) : null,
      Forecast: forecast ? Math.round(forecast.value) : null,
    };
  });

  // ✅ Debug - check how many forecasts matched
  const forecastCount = chartData.filter(d => d.Forecast !== null).length;
  const actualCount = chartData.filter(d => d.Actual !== null).length;
  console.log('Chart data - Actuals:', actualCount, 'Forecasts:', forecastCount);

  if (chartData.length === 0) {
    return <p style={{ color: 'red' }}>⚠️ No data to display. Try a different date range.</p>;
  }

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#555', marginBottom: '20px' }}>Power Generation (MW)</h2>

      {/* ✅ Debug info */}
      <p style={{ fontSize: '12px', color: '#999' }}>
        Actuals: {actualCount} points | Forecasts: {forecastCount} points
      </p>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 11 }}
            interval={Math.floor(chartData.length / 8)}
          />
          <YAxis
            tickFormatter={v => `${(v/1000).toFixed(0)}k`}
            label={{ value: 'Power (MW)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip formatter={v => [`${v} MW`]} />
          <Legend />
          <Line
            type="monotone"
            dataKey="Actual"
            stroke="#2196F3"
            strokeWidth={2}
            dot={false}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="Forecast"
            stroke="#4CAF50"
            strokeWidth={2}
            dot={false}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
        <span>🔵 Blue = Actual Generation</span>
        <span>🟢 Green = Forecasted Generation</span>
      </div>
    </div>
  );
}

export default Chart;