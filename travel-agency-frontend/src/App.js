import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import Tours from './pages/Tours';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      console.log('Logging in with email:', email);
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      console.log('Login response:', response.data);
      setUser(response.data.user);
      setIsAuthenticated(true);

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      console.log('Tokens stored');
      console.log('User state updated:', response.data.user);

      if (response.data.user.role === 'admin') {
        console.log('Redirecting to admin dashboard');
        navigate('/admin-dashboard');
      } else {
        console.log('Redirecting to user dashboard');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('Tokens cleared');
    setUser(null);
    setIsAuthenticated(false);
    console.log('State reset');
    navigate('/login');
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking/:tourId" element={<Booking />} />
        <Route
          path="/tours"
          element={
            <ProtectedRoute>
              <Tours />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;