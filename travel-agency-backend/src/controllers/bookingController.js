const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  const { tour_id, status } = req.body;
  const user_id = req.user.id; 

  console.log('Request payload:', req.body);
  console.log('Creating booking for user:', user_id, 'and tour:', tour_id);

  try {
    const bookingId = await Booking.create({ user_id, tour_id, status });
    console.log('Booking created successfully with ID:', bookingId);
    res.status(201).json({ id: bookingId, user_id, tour_id, status });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};

const getBookingsByUser = async (req, res) => {
  const user_id = req.user.id; 

  try {
    const bookings = await Booking.findByUserId(user_id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    await Booking.updateStatus(bookingId, status);
    res.json({ message: 'Booking status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update booking status' });
  }
};

const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    await Booking.delete(bookingId);
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete booking' });
  }
};

module.exports = { createBooking, getBookingsByUser, updateBookingStatus, deleteBooking };