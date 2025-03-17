import React, { useEffect, useState } from 'react';
import { Container, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import refreshAccessToken from '../services/auth';
import '../styles/styles.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true; 
  
    const fetchUser = async () => {
      try {
        let accessToken = localStorage.getItem('accessToken');
  
        const response = await axios.get('http://localhost:5000/api/tours/protected', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
  
        if (isMounted) {
          setUser(response.data.user);
        }
      } catch (err) {
        if (isMounted) {
          if (err.response?.status === 401) {
            try {
              const newAccessToken = await refreshAccessToken();
              console.log('Refreshed access token:', newAccessToken);
  
              const response = await axios.get('http://localhost:5000/api/tours/protected', {
                headers: { Authorization: `Bearer ${newAccessToken}` },
              });
  
              if (isMounted) {
                setUser(response.data.user);
              }
            } catch (refreshErr) {
              if (isMounted) {
                setError('Session expired. Please log in again.');
              }
            }
          } else {
            setError('Failed to fetch user data');
          }
        }
      }
    };
  
    fetchUser();
  
    return () => {
      isMounted = false; 
    };
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