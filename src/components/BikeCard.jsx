import React, { useState } from 'react';
import { Card, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaGasPump, FaRuler, FaCog } from 'react-icons/fa';
import PriceGraph from './PriceGraph';
import FuelCostModal from './FuelCostModal';

export default function BikeCard({ bike, onCompare, isCompared, onWishlist, isWishlisted }) {
  const [showFuel, setShowFuel] = useState(false);

  return (
    <Card
      className="h-100 shadow-sm border-0 rounded-4 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <Card.Title className="fw-bold">{bike.bike_name}</Card.Title>
          <div className="d-flex gap-2">
            <OverlayTrigger placement="top" overlay={<Tooltip>Add to wishlist</Tooltip>}>
              <Button variant="link" className="p-0" onClick={() => onWishlist(bike)}>
                {isWishlisted ? <FaHeart color="red" size={20} /> : <FaRegHeart size={20} />}
              </Button>
            </OverlayTrigger>
            <Badge bg="light" text="dark" pill className="fw-normal">
              ⭐ {bike.rating}
            </Badge>
          </div>
        </div>

        <div className="mt-2 mb-3">
          <span className="h4 text-primary">₹{bike.price.toLocaleString()}</span>
          <span className="text-muted ms-2">*ex-showroom</span>
        </div>

        <div className="d-flex flex-wrap gap-3 text-muted small mb-3">
          <OverlayTrigger placement="top" overlay={<Tooltip>Engine Displacement</Tooltip>}>
            <div><FaCog /> {bike.engine_cc} cc</div>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Mileage (claimed)</Tooltip>}>
            <div><FaGasPump /> {bike.mileage || 'N/A'} km/l</div>
          </OverlayTrigger>
          <OverlayTrigger placement="top" overlay={<Tooltip>Seat Height</Tooltip>}>
            <div><FaRuler /> {bike.seat_height} mm</div>
          </OverlayTrigger>
        </div>

        <div className="bg-light p-2 rounded-3 mb-3 small">
          <span className="fw-semibold">✨ Why this?</span> {bike.explanation}
        </div>

        <PriceGraph bike={bike} />

        <div className="d-flex gap-2 mt-3">
          <Button variant="outline-secondary" size="sm" onClick={() => setShowFuel(true)}>
            ⛽ Fuel Cost
          </Button>
          <Button
            variant={isCompared ? "warning" : "outline-primary"}
            size="sm"
            onClick={() => onCompare(bike)}
          >
            {isCompared ? '★ Added' : '☆ Compare'}
          </Button>
        </div>
      </Card.Body>
      <FuelCostModal show={showFuel} onHide={() => setShowFuel(false)} bike={bike} />
    </Card>
  );
}