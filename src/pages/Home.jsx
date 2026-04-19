import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import BikeCard from '../components/BikeCard';
import ComparisonModal from '../components/ComparisonModal';
import NavbarComponent from '../components/NavbarComponent';
import { getRecommendations } from '../services/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Home() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [darkMode, setDarkMode] = useState(false);

  // Filter state
  const [budget, setBudget] = useState(150000);
  const [height, setHeight] = useState(175);
  const [experience, setExperience] = useState('intermediate');
  const [mileagePriority, setMileagePriority] = useState(false);
  const [ratingPriority, setRatingPriority] = useState(false);
  const [resalePriority, setResalePriority] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const results = await getRecommendations({
      budget, height, experience,
      mileage_priority: mileagePriority,
      rating_priority: ratingPriority,
      resale_priority: resalePriority,
    });
    setRecommendations(results);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCompare = (bike) => {
    if (!compareList.find(b => b.bike_name === bike.bike_name) && compareList.length < 4) {
      setCompareList([...compareList, bike]);
      setToast({ show: true, message: `${bike.bike_name} added to compare` });
      setTimeout(() => setToast({ show: false, message: '' }), 2000);
    } else if (compareList.length >= 4) {
      setToast({ show: true, message: 'You can compare up to 4 bikes' });
      setTimeout(() => setToast({ show: false, message: '' }), 2000);
    }
  };

  const toggleWishlist = (bike) => {
    if (wishlist.find(b => b.bike_name === bike.bike_name)) {
      setWishlist(wishlist.filter(b => b.bike_name !== bike.bike_name));
      setToast({ show: true, message: `${bike.bike_name} removed from wishlist` });
    } else {
      setWishlist([...wishlist, bike]);
      setToast({ show: true, message: `${bike.bike_name} added to wishlist` });
    }
    setTimeout(() => setToast({ show: false, message: '' }), 2000);
  };

  const removeFromCompare = (bikeName) => {
    setCompareList(compareList.filter(b => b.bike_name !== bikeName));
  };

  const handleNavbarSearch = (term) => {
    if (term) {
      const filtered = recommendations.filter(b => b.bike_name.toLowerCase().includes(term.toLowerCase()));
      setRecommendations(filtered);
    } else {
      handleSearch(); // re-run search if term empty
    }
  };

  useEffect(() => {
    handleSearch(); // initial load
  }, []);

  return (
    <div className={darkMode ? 'bg-dark text-white' : 'bg-light'} style={{ minHeight: '100vh', transition: 'all 0.3s' }}>
      <NavbarComponent onSearch={handleNavbarSearch} darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <Container fluid className="py-4">
        <Row>
          {/* Sidebar Filters */}
          <Col md={3} className="mb-4">
            <div className={`p-3 rounded shadow-sm sticky-top ${darkMode ? 'bg-secondary text-white' : 'bg-white'}`} style={{ top: '1rem' }}>
              <h5 className="mb-3">🔍 Filters</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Budget (₹) – ₹{budget.toLocaleString()}</Form.Label>
                  <Form.Range
                    min={50000}
                    max={2000000}
                    step={10000}
                    value={budget}
                    onChange={e => setBudget(+e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Your Height (cm) – {height} cm</Form.Label>
                  <Form.Range
                    min={140}
                    max={200}
                    step={1}
                    value={height}
                    onChange={e => setHeight(+e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Experience</Form.Label>
                  <Form.Select value={experience} onChange={e => setExperience(e.target.value)}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <div className="d-flex flex-column gap-1">
                    <Form.Check label="Mileage" checked={mileagePriority} onChange={() => setMileagePriority(!mileagePriority)} />
                    <Form.Check label="User Rating" checked={ratingPriority} onChange={() => setRatingPriority(!ratingPriority)} />
                    <Form.Check label="Resale Value" checked={resalePriority} onChange={() => setResalePriority(!resalePriority)} />
                  </div>
                </Form.Group>
                <Button variant="primary" className="w-100" onClick={handleSearch}>
                  Search Bikes
                </Button>
              </Form>
            </div>
          </Col>

          {/* Main Content */}
          <Col md={9}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>🏍️ New Bikes</h4>
              {compareList.length > 0 && (
                <Button variant="outline-primary" onClick={() => setShowCompare(true)}>
                  Compare ({compareList.length})
                </Button>
              )}
            </div>

            {loading ? (
              <Row xs={1} md={2} lg={3} className="g-4">
                {[1,2,3,4,5,6].map(i => (
                  <Col key={i}>
                    <Skeleton height={300} className="rounded-4" />
                  </Col>
                ))}
              </Row>
            ) : recommendations.length === 0 ? (
              <div className="text-center py-5 bg-white rounded shadow-sm">
                <p>No bikes found. Adjust filters.</p>
              </div>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {recommendations.map((bike, idx) => (
                  <Col key={idx}>
                    <BikeCard
                      bike={bike}
                      onCompare={addToCompare}
                      isCompared={compareList.some(b => b.bike_name === bike.bike_name)}
                      onWishlist={toggleWishlist}
                      isWishlisted={wishlist.some(b => b.bike_name === bike.bike_name)}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      <ComparisonModal
        show={showCompare}
        onHide={() => setShowCompare(false)}
        bikes={compareList}
        onRemove={removeFromCompare}
      />

      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={toast.show} onClose={() => setToast({ show: false })} delay={2000} autohide bg={toast.message.includes('added') ? 'success' : 'warning'}>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}