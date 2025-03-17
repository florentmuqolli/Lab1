const db = require('../config/db');

const Booking = {
  findByUserId: async (user_id) => {
    const query = 'SELECT * FROM bookings WHERE user_id = $1';
    const values = [user_id];
    console.log('Executing query:', query, 'with values:', values);

    try {
      const { rows } = await db.query(query, values);
      console.log('Query result:', rows);
      return rows;
    } catch (err) {
      console.error('Error executing query:', err);
      throw err;
    }
  },
};

module.exports = Booking;