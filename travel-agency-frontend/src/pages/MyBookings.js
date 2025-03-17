import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');
      console.log('Access token:', accessToken);
  
      if (!accessToken) {
        console.error('No access token found');
        setError('No access token found. Please log in again.');
        setLoading(false);
        return;
      }
  
      try {
        console.log('Fetching bookings...');
        const response = await axios.get('http://localhost:5000/api/bookings', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log('Bookings fetched successfully:', response.data);
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to fetch bookings. Please try again later.');
      } finally {
        console.log('Fetching complete');
        setLoading(false);
      }
    };
  
    fetchBookings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>Tour ID: {booking.tour_id}</p>
              <p>Booking Date: {new Date(booking.booking_date).toLocaleDateString()}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;