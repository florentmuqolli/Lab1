import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../styles/styles.css';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true; 
  
    const fetchTours = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/api/tours', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
  
        if (isMounted) {
          setTours(response.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch tours:', err);
        }
      }
    };
  
    fetchTours();
  
    return () => {
      isMounted = false; 
    };
  }, []);

  const filteredTours = tours.filter((tour) =>
    tour.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1>Tours</h1>
      <Form.Control
        type="text"
        placeholder="Search tours..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Row>
        {filteredTours.map((tour) => (
          <Col key={tour.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={tour.image_url} />
              <Card.Body>
                <Card.Title>{tour.title}</Card.Title>
                <Card.Text>{tour.description}</Card.Text>
                <Card.Text>Price: ${tour.price}</Card.Text>
                <Button variant="primary" href={`/booking/${tour.id}`}>Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Tours;