import React, { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/api/tours/protected', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(response.data.user);
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };

    fetchUser();
  }, []);

  return (
    <Container>
      <h1>Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;