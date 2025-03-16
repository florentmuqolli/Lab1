import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const BookingModal = ({ show, onHide, booking, onCreate, onUpdate }) => {
  const [userId, setUserId] = useState(booking ? booking.user_id : '');
  const [tourId, setTourId] = useState(booking ? booking.tour_id : '');
  const [status, setStatus] = useState(booking ? booking.status : 'pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = { user_id: userId, tour_id: tourId, status };
    if (booking) {
      onUpdate(booking.id, bookingData);
    } else {
      onCreate(bookingData);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{booking ? 'Edit Booking' : 'Add Booking'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="userId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="tourId">
            <Form.Label>Tour ID</Form.Label>
            <Form.Control
              type="number"
              value={tourId}
              onChange={(e) => setTourId(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            {booking ? 'Update' : 'Create'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;