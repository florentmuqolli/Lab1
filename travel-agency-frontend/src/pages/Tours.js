import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const Tours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tours');
        setTours(response.data);
      } catch (err) {
        console.error('Failed to fetch tours:', err);
      }
    };

    fetchTours();
  }, []);

  return (
    <Container>
      <h1>Tours</h1>
      <Row>
        {tours.map((tour) => (
          <Col key={tour.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={tour.image_url} />
              <Card.Body>
                <Card.Title>{tour.title}</Card.Title>
                <Card.Text>{tour.description}</Card.Text>
                <Card.Text>Price: ${tour.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Tours;