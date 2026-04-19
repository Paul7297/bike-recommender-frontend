import React, { useState } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';

export default function FuelCostModal({ show, onHide, bike }) {
  const [dailyKm, setDailyKm] = useState(30);
  const [fuelPrice, setFuelPrice] = useState(105);

  if (!bike || !bike.mileage) return null;

  const monthlyKm = dailyKm * 30;
  const monthlyFuel = monthlyKm / bike.mileage;
  const monthlyCost = monthlyFuel * fuelPrice;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Fuel Cost – {bike.bike_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Label>Daily commute (km)</Form.Label>
              <Form.Control type="number" value={dailyKm} onChange={e => setDailyKm(+e.target.value)} />
            </Col>
            <Col>
              <Form.Label>Fuel price (₹/L)</Form.Label>
              <Form.Control type="number" value={fuelPrice} onChange={e => setFuelPrice(+e.target.value)} />
            </Col>
          </Row>
          <div className="bg-light p-3 rounded">
            <p className="mb-1"><strong>Monthly fuel cost:</strong> ₹{monthlyCost.toFixed(0)}</p>
            <p className="text-muted small mb-0">Based on {bike.mileage} km/l</p>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}