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
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        { tour_id: tourId, status: 'pending' }, 
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setSuccess('Booking created successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); 
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Book Tour</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Book Now
        </Button>
      </Form>
    </Container>
  );
};

export default Booking;