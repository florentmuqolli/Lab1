const User = require('../models/User');
const Tour = require('../models/Tour');
const Booking = require('../models/Booking');

const createUser = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const userId = await User.create({ name, email, password, role });
    res.status(201).json({ id: userId, name, email, role });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user' });
  }
};

  const createTour = async (req, res) => {
    const { title, description, price, duration, location, image_url } = req.body;
  
    try {
      const tourId = await Tour.create({ title, description, price, duration, location, image_url });
      res.status(201).json({ id: tourId, title, description, price, duration, location, image_url });
    } catch (err) {
      res.status(500).json({ message: 'Failed to create tour' });
    }
  };

  const createBooking = async (req, res) => {
    const { user_id, tour_id, status } = req.body;
    if (!user_id || !tour_id || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const bookingId = await Booking.create({ user_id, tour_id, status });
      res.status(201).json({ id: bookingId, user_id, tour_id, status });
    } catch (err) {
      res.status(500).json({ message: 'Failed to create booking' });
    }
  };
  
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, email, role } = req.body;
  
    try {
      await User.update(userId, { name, email, role });
      res.json({ message: 'User updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update user' });
    }
  };
  
  
  const updateTour = async (req, res) => {
    const { tourId } = req.params;
    const { title, description, price, duration, location, image_url } = req.body;
  
    try {
      await Tour.update(tourId, { title, description, price, duration, location, image_url });
      res.json({ message: 'Tour updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update tour' });
    }
  };
  
  const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;
  
    try {
      await Booking.updateStatus(bookingId, status);
      res.json({ message: 'Booking updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update booking' });
    }
  };

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.getAll();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tours' });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAll();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await User.delete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

const deleteTour = async (req, res) => {
  const { tourId } = req.params;

  try {
    await Tour.delete(tourId);
    res.json({ message: 'Tour deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete tour' });
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

module.exports = {
    getAllUsers,
    getAllTours,
    getAllBookings,
    createUser,
    updateUser,
    deleteUser,
    createTour,
    updateTour,
    deleteTour,
    createBooking,
    updateBooking,
    deleteBooking,
  };