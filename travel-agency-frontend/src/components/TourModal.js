import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const TourModal = ({ show, onHide, tour, onCreate, onUpdate }) => {
  const [title, setTitle] = useState(tour ? tour.title : '');
  const [description, setDescription] = useState(tour ? tour.description : '');
  const [price, setPrice] = useState(tour ? tour.price : '');
  const [duration, setDuration] = useState(tour ? tour.duration : '');
  const [location, setLocation] = useState(tour ? tour.location : '');
  const [imageUrl, setImageUrl] = useState(tour ? tour.image_url : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const tourData = { title, description, price, duration, location, image_url: imageUrl };
    if (tour) {
      onUpdate(tour.id, tourData);
    } else {
      onCreate(tourData);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{tour ? 'Edit Tour' : 'Add Tour'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="imageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {tour ? 'Update' : 'Create'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TourModal;