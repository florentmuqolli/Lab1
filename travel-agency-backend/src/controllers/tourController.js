const Tour = require('../models/Tour');
const User = require('../models/User');

const getAllTour = async (req, res) => {
  try {
    const tours = await Tour.getAll();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tours' });
  }
};

const createTour = async (req, res) => {
  const tour = req.body;
  const tourId = await Tour.create(tour);
  res.status(201).json({ id: tourId, ...tour });
};

const getProtectedData = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Fetching user with ID:', userId); 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User data:', user); 
    res.json({ message: 'This is protected data!', user });
  } catch (err) {
    console.error('Error in getProtectedData:', err);
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
};

module.exports = { getAllTour, createTour, getProtectedData };