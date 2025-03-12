const Tour = require('../models/Tour');

const getAllTours = async (req, res) => {
  const tours = await Tour.getAll();
  res.json(tours);
};

const createTour = async (req, res) => {
  const tour = req.body;
  const tourId = await Tour.create(tour);
  res.status(201).json({ id: tourId, ...tour });
};

module.exports = { getAllTours, createTour };