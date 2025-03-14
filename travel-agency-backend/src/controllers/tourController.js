const Tour = require('../models/Tour');
const User = require('../models/User');

const getAllTours = async (req, res) => {
  const tours = await Tour.getAll();
  res.json(tours);
};

const createTour = async (req, res) => {
  const tour = req.body;
  const tourId = await Tour.create(tour);
  res.status(201).json({ id: tourId, ...tour });
};

const getProtectedData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'This is protected data!', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
};

module.exports = { getAllTours, createTour, getProtectedData };