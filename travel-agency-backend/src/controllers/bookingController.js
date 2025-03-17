const Booking = require('../models/Booking');

const getBookingsByUser = async (req, res) => {
  const user_id = req.user.id;
  console.log('Fetching bookings for user ID:', user_id);

  try {
    const bookings = await Booking.findByUserId(user_id);
    console.log('Bookings data:', bookings);
    res.json(bookings);
  } catch (err) {
    console.error('Error in getBookingsByUser:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

module.exports = { getBookingsByUser };