import React, { useState } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';

const FuelCostCalculator = ({ bike }) => {
  const [dailyKm, setDailyKm] = useState(30);
  const [fuelPrice, setFuelPrice] = useState(105);

  if (!bike || !bike.mileage || bike.mileage === 0) {
    return <Alert variant="warning">Mileage data not available for this bike.</Alert>;
  }

  const monthlyKm = dailyKm * 30;
  const monthlyFuelLiters = monthlyKm / bike.mileage;
  const monthlyCost = monthlyFuelLiters * fuelPrice;

  return (
    <div className="mt-2 p-2 bg-info bg-opacity-10 rounded">
      <h6>Fuel Cost Estimator</h6>
      <Row className="g-2">
        <Col>
          <Form.Label>Daily km</Form.Label>
          <Form.Control
            type="number"
            value={dailyKm}
            onChange={(e) => setDailyKm(Number(e.target.value))}
            size="sm"
          />
        </Col>
        <Col>
          <Form.Label>Fuel price (₹/L)</Form.Label>
          <Form.Control
            type="number"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(Number(e.target.value))}
            size="sm"
          />
        </Col>
      </Row>
      <p className="mt-2 mb-0"><strong>Monthly cost:</strong> ₹{monthlyCost.toFixed(0)}</p>
      <small>Based on {bike.mileage} km/l</small>
    </div>
  );
};

export default FuelCostCalculator;