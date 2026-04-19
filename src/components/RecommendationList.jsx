import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import BikeCard from './BikeCard';
import ComparisonTable from './ComparisonTable';

const RecommendationList = ({ recommendations }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (bike) => {
    if (compareList.some(b => b.bike_name === bike.bike_name)) {
      setCompareList(compareList.filter(b => b.bike_name !== bike.bike_name));
    } else if (compareList.length < 4) {
      setCompareList([...compareList, bike]);
    } else {
      alert('You can compare up to 4 bikes at once.');
    }
  };

  const removeFromCompare = (bikeName) => {
    setCompareList(compareList.filter(b => b.bike_name !== bikeName));
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <Alert variant="info" className="text-center mt-4">
        No bikes match your criteria. Try adjusting filters.
      </Alert>
    );
  }

  return (
    <Container className="mt-4">
      <ComparisonTable bikes={compareList} onRemove={removeFromCompare} />
      <h2 className="mb-3">Top Recommendations</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {recommendations.map((bike, idx) => (
          <Col key={idx}>
            <BikeCard
              bike={bike}
              onCompareToggle={addToCompare}
              isSelected={compareList.some(b => b.bike_name === bike.bike_name)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecommendationList;