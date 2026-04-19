import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaSun, FaMoon, FaSearch } from 'react-icons/fa';

export default function NavbarComponent({ onSearch, darkMode, toggleDarkMode }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" sticky="top" className="shadow-sm transition-all">
      <Container fluid>
        <Navbar.Brand href="/" className="fw-bold fs-4">
          🏍️ RideRecommender
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#compare">Compare</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
          <Form className="d-flex me-2" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search bikes..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-primary" type="submit"><FaSearch /></Button>
          </Form>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Toggle theme</Tooltip>}>
            <Button variant="outline-secondary" onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </Button>
          </OverlayTrigger>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}