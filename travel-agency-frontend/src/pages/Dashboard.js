import React, { useEffect, useState } from 'react';
import { Container, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import refreshAccessToken from '../services/auth';
import '../styles/styles.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/api/tours/protected', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUser(response.data.user);
      } catch (err) {
        if (err.response?.status === 401) {
          try {
            const newAccessToken = await refreshAccessToken();
            const response = await axios.get('http://localhost:5000/api/tours/protected', {
              headers: { Authorization: `Bearer ${newAccessToken}` },
            });
            setUser(response.data.user);
          } catch (refreshErr) {
            setError('Session expired. Please log in again.');
          }
        } else {
          setError('Failed to fetch user data');
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {user && (
        <Card className="shadow">
          <Card.Body>
            <Card.Title>Welcome, {user.name}!</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {user.email}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;