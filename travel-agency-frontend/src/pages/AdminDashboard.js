import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert, Modal, Form, Row, Col, Nav } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import UserModal from '../components/UserModal';
import TourModal from '../components/TourModal';
import BookingModal from '../components/BookingModal';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeSection, setActiveSection] = useState('users'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const usersResponse = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUsers(usersResponse.data);

        const toursResponse = await axios.get('http://localhost:5000/api/admin/tours', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setTours(toursResponse.data);

        const bookingsResponse = await axios.get('http://localhost:5000/api/admin/bookings', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setBookings(bookingsResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('http://localhost:5000/api/auth/refresh-token', {
        refreshToken,
      });
  
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data.accessToken;
    } catch (err) {
      console.error('Failed to refresh access token:', err.response?.data || err.message);
      throw err;
    }
  };

  const handleCreateUser = async (user) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      console.log('Creating user with payload:', user); 
      console.log('Access token:', accessToken); 
  
      const response = await axios.post('http://localhost:5000/api/admin/users', user, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUsers([...users, response.data]);
      setShowUserModal(false);
    } catch (err) {
      console.error('Error creating user:', err.response?.data || err.message); 
      setError('Failed to create user');
    }
  };

  const handleUpdateUser = async (userId, updatedUser) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5000/api/admin/users/${userId}`, updatedUser, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsers);
      setShowUserModal(false);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          await axios.put(`http://localhost:5000/api/admin/users/${userId}`, updatedUser, {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
  
          const updatedUsers = users.map((user) =>
            user.id === userId ? { ...user, ...updatedUser } : user
          );
          setUsers(updatedUsers);
          setShowUserModal(false);
        } catch (refreshErr) {
          console.error('Failed to refresh token or retry request:', refreshErr.response?.data || refreshErr.message);
          setError('Session expired. Please log in again.');
          navigate('/login');
        }
      } else {
        console.error('Error updating user:', err.response?.data || err.message);
        setError('Failed to update user');
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      let response = await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
  
          const updatedUsers = users.filter((user) => user.id !== userId);
          setUsers(updatedUsers);
        } catch (refreshErr) {
          console.error('Failed to refresh token or retry request:', refreshErr.response?.data || refreshErr.message);
          setError('Session expired. Please log in again.');
          navigate('/login');
        }
      } else {
        console.error('Error deleting user:', err.response?.data || err.message);
        setError('Failed to delete user');
      }
    }
  };

  const handleCreateTour = async (tour) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:5000/api/admin/tours', tour, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setTours([...tours, response.data]);
      setShowTourModal(false);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          const response = await axios.post('http://localhost:5000/api/admin/tours', tour, {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
          setTours([...tours, response.data]);
          setShowTourModal(false);
        } catch (refreshErr) {
          console.error('Failed to refresh token or retry request:', refreshErr.response?.data || refreshErr.message);
          setError('Session expired. Please log in again.');
          navigate('/login');
        }
      } else {
        console.error('Error creating tour:', err.response?.data || err.message);
        setError('Failed to create tour');
      }
    }
  };

  const handleUpdateTour = async (tourId, updatedTour) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5000/api/admin/tours/${tourId}`, updatedTour, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      const updatedTours = tours.map((tour) =>
        tour.id === tourId ? { ...tour, ...updatedTour } : tour
      );
      setTours(updatedTours);
      setShowTourModal(false);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          await axios.put(`http://localhost:5000/api/admin/tours/${tourId}`, updatedTour, {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
  
          const updatedTours = tours.map((tour) =>
            tour.id === tourId ? { ...tour, ...updatedTour } : tour
          );
          setTours(updatedTours);
          setShowTourModal(false);
        } catch (refreshErr) {
          console.error('Failed to refresh token or retry request:', refreshErr.response?.data || refreshErr.message);
          setError('Session expired. Please log in again.');
          navigate('/login');
        }
      } else {
        console.error('Error updating tour:', err.response?.data || err.message);
        setError('Failed to update tour');
      }
    }
  };

  const handleDeleteTour = async (tourId) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:5000/api/admin/tours/${tourId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      const updatedTours = tours.filter((tour) => tour.id !== tourId);
      setTours(updatedTours);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          await axios.delete(`http://localhost:5000/api/admin/tours/${tourId}`, {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
  
          const updatedTours = tours.filter((tour) => tour.id !== tourId);
          setTours(updatedTours);
        } catch (refreshErr) {
          console.error('Failed to refresh token or retry request:', refreshErr.response?.data || refreshErr.message);
          setError('Session expired. Please log in again.');
          navigate('/login');
        }
      } else {
        console.error('Error deleting tour:', err.response?.data || err.message);
        setError('Failed to delete tour');
      }
    }
  };

  const handleCreateBooking = async (booking) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:5000/api/admin/bookings', booking, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setBookings([...bookings, response.data]);
      setShowBookingModal(false);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          const response = await axios.post('http://localhost:5000/api/admin/bookings', booking, {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
          setBookings([...bookings, response.data]);
          setShowBookingModal(false);
        } catch (refreshErr) {
          console.error('Failed to refresh token or retry request:', refreshErr.response?.data || refreshErr.message);
          setError('Session expired. Please log in again.');
          navigate('/login');
        }
      } else {
        console.error('Error creating booking:', err.response?.data || err.message);
        setError('Failed to create booking');
      }
    }
  };

  const handleUpdateBooking = async (bookingId, updatedBooking) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      await axios.put(`http://localhost:5000/api/admin/bookings/${bookingId}`, updatedBooking, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      const updatedBookings = bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, ...updatedBooking } : booking
      );
      setBookings(updatedBookings);
      setShowBookingModal(false);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          await axios.put(`http://localhost:5000/api/admin/bookings/${bookingId}`, updatedBooking, {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
  
          const updatedBookings = bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, ...updatedBooking } : booking
          );
          setBookings(updatedBookings);
          setShowBookingModal(false);
        } catch (refreshErr) {
          console.error('Failed to refresh token or retry request:', refreshErr.response?.data || refreshErr.message);
          setError('Session expired. Please log in again.');
          navigate('/login');
        }
      } else {
        console.error('Error updating booking:', err.response?.data || err.message);
        setError('Failed to update booking');
      }
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:5000/api/admin/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
      setBookings(updatedBookings);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          await axios.delete(`http://localhost:5000/api/admin/bookings/${bookingId}`, {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
  
          const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
          setBookings(updatedBookings);
        } catch (refreshErr) {
          console.error('Failed to refresh token or retry request:', refreshErr.response?.data || refreshErr.message);
          setError('Session expired. Please log in again.');
          navigate('/login');
        }
      } else {
        console.error('Error deleting booking:', err.response?.data || err.message);
        setError('Failed to delete booking');
      }
    }
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={2} className="bg-light sidebar">
          <Nav className="flex-column">
            <Nav.Link
              className={activeSection === 'users' ? 'active' : ''}
              onClick={() => setActiveSection('users')}
            >
              Users
            </Nav.Link>
            <Nav.Link
              className={activeSection === 'tours' ? 'active' : ''}
              onClick={() => setActiveSection('tours')}
            >
              Tours
            </Nav.Link>
            <Nav.Link
              className={activeSection === 'bookings' ? 'active' : ''}
              onClick={() => setActiveSection('bookings')}
            >
              Bookings
            </Nav.Link>
          </Nav>
        </Col>

        <Col md={10}>
          <h1 className="text-center mb-4">Admin Dashboard</h1>
          {error && <Alert variant="danger">{error}</Alert>}

          {activeSection === 'users' && (
            <>
              <h2>Users</h2>
              <Button variant="primary" onClick={() => { setSelectedUser(null); setShowUserModal(true); }}>
                Add User
              </Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Button variant="warning" onClick={() => { setSelectedUser(user); setShowUserModal(true); }}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          {activeSection === 'tours' && (
            <>
              <h2>Tours</h2>
              <Button variant="primary" onClick={() => { setSelectedTour(null); setShowTourModal(true)}}>
                Add Tour
              </Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour) => (
                    <tr key={tour.id}>
                      <td>{tour.id}</td>
                      <td>{tour.title}</td>
                      <td>${tour.price}</td>
                      <td>
                        <Button variant="warning" onClick={() => { setSelectedTour(tour); setShowTourModal(true); }}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteTour(tour.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          {activeSection === 'bookings' && (
            <>
              <h2>Bookings</h2>
              <Button variant="primary" onClick={() => { setSelectedBooking(null); setShowBookingModal(true)}}>
                Add Booking
              </Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Tour ID</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.user_id}</td>
                      <td>{booking.tour_id}</td>
                      <td>{booking.status}</td>
                      <td>
                        <Button variant="warning" onClick={() => { setSelectedBooking(booking); setShowBookingModal(true); }}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteBooking(booking.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>

      <UserModal
        show={showUserModal}
        onHide={() => { setShowUserModal(false); setSelectedUser(null); }}
        user={selectedUser}
        onCreate={handleCreateUser}
        onUpdate={handleUpdateUser}
      />

      <TourModal
        show={showTourModal}
        onHide={() => { setShowTourModal(false); setSelectedTour(null); }}
        tour={selectedTour}
        onCreate={handleCreateTour}
        onUpdate={handleUpdateTour}
      />

      <BookingModal
        show={showBookingModal}
        onHide={() => { setShowBookingModal(false); setSelectedBooking(null); }}
        booking={selectedBooking}
        onCreate={handleCreateBooking}
        onUpdate={handleUpdateBooking}
      />
    </Container>
  );
};

export default AdminDashboard;