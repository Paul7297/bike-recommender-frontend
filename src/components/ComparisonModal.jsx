import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';

export default function ComparisonModal({ show, onHide, bikes, onRemove }) {
  if (!bikes.length) return null;

  const features = [
    { key: 'price', label: 'Price (₹)', formatter: v => `₹${v?.toLocaleString()}` },
    { key: 'engine_cc', label: 'Engine (cc)' },
    { key: 'mileage', label: 'Mileage (km/l)' },
    { key: 'rating', label: 'Rating' },
    { key: 'seat_height', label: 'Seat Height (mm)' },
    { key: 'resale_value', label: 'Resale (3 yr)', formatter: v => `₹${v?.toLocaleString()}` },
  ];

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Compare Bikes</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Table responsive bordered hover className="mb-0">
          <thead>
            <tr>
              <th>Feature</th>
              {bikes.map(b => (
                <th key={b.bike_name}>
                  {b.bike_name}
                  <Button variant="link" size="sm" className="text-danger" onClick={() => onRemove(b.bike_name)}>✖</Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map(f => (
              <tr key={f.key}>
                <td className="fw-semibold">{f.label}</td>
                {bikes.map(b => (
                  <td key={b.bike_name}>
                    {f.formatter ? f.formatter(b[f.key]) : b[f.key] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}