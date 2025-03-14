import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/styles.css';

const Booking = () => {
  const { tourId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(
        'http://localhost:5000/api/bookings',
        { tourId, name, email },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      navigate('/dashboard');
    } catch (err) {
      setError('Booking failed. Please try again.');
    }
  };

  return (
    <Container>
      <h1>Book Tour</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3">Book Now</Button>
      </Form>
    </Container>
  );
};

export default Booking;