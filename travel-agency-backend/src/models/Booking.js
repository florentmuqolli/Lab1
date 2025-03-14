const db = require('../config/db');

class Booking {
  static async create(booking) {
    const { user_id, tour_id, status } = booking;
    const [result] = await db.query(
      'INSERT INTO bookings (user_id, tour_id, status) VALUES (?, ?, ?)',
      [user_id, tour_id, status]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM bookings WHERE user_id = ?',
      [userId]
    );
    return rows;
  }

  static async findById(bookingId) {
    const [rows] = await db.query(
      'SELECT * FROM bookings WHERE id = ?',
      [bookingId]
    );
    return rows[0];
  }

  static async updateStatus(bookingId, status) {
    await db.query(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, bookingId]
    );
  }

  static async delete(bookingId) {
    await db.query(
      'DELETE FROM bookings WHERE id = ?',
      [bookingId]
    );
  }
}

module.exports = Booking;