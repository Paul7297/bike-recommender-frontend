import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

const ComparisonTable = ({ bikes, onRemove }) => {
  if (!bikes || bikes.length === 0) {
    return (
      <Alert variant="secondary" className="text-center">
        Select bikes to compare (click ☆ Compare on bike cards).
      </Alert>
    );
  }

  return (
    <div className="mb-4 p-3 bg-light rounded">
      <h4>Compare Bikes ({bikes.length} selected)</h4>
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Feature</th>
            {bikes.map((bike, idx) => (
              <th key={idx}>
                {bike.bike_name}
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => onRemove(bike.bike_name)}
                >
                  ✖
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr><td>Price (₹)</td>{bikes.map(b => <td key={b.bike_name}>{(b.price || 0).toLocaleString()}</td>)}</tr>
          <tr><td>Engine (cc)</td>{bikes.map(b => <td key={b.bike_name}>{b.engine_cc || 'N/A'}</td>)}</tr>
          <tr><td>Mileage (km/l)</td>{bikes.map(b => <td key={b.bike_name}>{b.mileage || 'N/A'}</td>)}</tr>
          <tr><td>Rating</td>{bikes.map(b => <td key={b.bike_name}>{b.rating || 'N/A'} ★</td>)}</tr>
          <tr><td>Seat Height (mm)</td>{bikes.map(b => <td key={b.bike_name}>{b.seat_height || 'N/A'}</td>)}</tr>
          <tr><td>Resale Value (3 yr)</td>{bikes.map(b => <td key={b.bike_name}>₹{(b.resale_value || 0).toLocaleString()}</td>)}</tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ComparisonTable;