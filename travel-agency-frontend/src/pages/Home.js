import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to Our Travel Agency</h1>
          <Button variant="primary" href="/tours">Explore Tours</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;