import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const UserForm = ({ onSubmit }) => {
  const [budget, setBudget] = useState(150000);
  const [mileagePriority, setMileagePriority] = useState(false);
  const [ratingPriority, setRatingPriority] = useState(false);
  const [resalePriority, setResalePriority] = useState(false);
  const [height, setHeight] = useState(175);
  const [experience, setExperience] = useState('intermediate');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      budget,
      mileage_priority: mileagePriority,
      rating_priority: ratingPriority,
      resale_priority: resalePriority,
      height,
      experience,
    });
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h3 className="mb-3">Find Your Perfect Bike</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Budget (₹)</Form.Label>
            <Form.Control
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              step="10000"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Height (cm)</Form.Label>
            <Form.Control
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Experience Level</Form.Label>
            <Form.Select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priorities</Form.Label>
            <div className="d-flex gap-3">
              <Form.Check
                type="checkbox"
                label="Mileage"
                checked={mileagePriority}
                onChange={() => setMileagePriority(!mileagePriority)}
              />
              <Form.Check
                type="checkbox"
                label="User Ratings"
                checked={ratingPriority}
                onChange={() => setRatingPriority(!ratingPriority)}
              />
              <Form.Check
                type="checkbox"
                label="Resale Value"
                checked={resalePriority}
                onChange={() => setResalePriority(!resalePriority)}
              />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Recommend Bikes
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserForm;