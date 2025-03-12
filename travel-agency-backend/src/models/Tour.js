const db = require('../config/db');

class Tour {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM tours');
    return rows;
  }

  static async create(tour) {
    const { title, description, price, duration, location, image_url } = tour;
    const [result] = await db.query(
      'INSERT INTO tours (title, description, price, duration, location, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, price, duration, location, image_url]
    );
    return result.insertId;
  }
}

module.exports = Tour;