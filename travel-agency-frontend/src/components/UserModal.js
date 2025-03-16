import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UserModal = ({ show, onHide, user, onCreate, onUpdate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setPassword(''); 
    } else {
      setName('');
      setEmail('');
      setRole('user');
      setPassword('');
    }
  }, [user, show]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password, role };
    if (user) {
      onUpdate(user.id, userData);
    } else {
      onCreate(userData);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? 'Edit User' : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!user} 
            />
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            {user ? 'Update' : 'Create'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;