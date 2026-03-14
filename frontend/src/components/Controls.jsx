import React from 'react';

function Controls({ startDate, endDate, horizon, onStartChange, onEndChange, onHorizonChange }) {
  return (
    <div style={{
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
      flexWrap: 'wrap',
      background: '#f5f5f5',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px'
    }}>

      {/* Start Date */}
      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
          📅 Start Time:
        </label>
        <input
          type="datetime-local"
          value={startDate + 'T00:00'}
          onChange={e => onStartChange(e.target.value.split('T')[0])}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      {/* End Date */}
      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
          📅 End Time:
        </label>
        <input
          type="datetime-local"
          value={endDate + 'T00:00'}
          onChange={e => onEndChange(e.target.value.split('T')[0])}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      {/* Horizon Slider */}
      <div>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
          ⏱️ Forecast Horizon: {horizon}h
        </label>
        <input
          type="range"
          min="0"
          max="48"
          value={horizon}
          onChange={e => onHorizonChange(Number(e.target.value))}
          style={{ width: '200px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span>0h</span>
          <span>48h</span>
        </div>
      </div>

    </div>
  );
}

export default Controls;