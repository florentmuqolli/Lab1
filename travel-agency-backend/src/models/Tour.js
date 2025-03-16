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

  static async update(tourId, tourData) {
    const { title, description, price, duration, location, image_url } = tourData;
    await db.query(
      'UPDATE tours SET title = ?, description = ?, price = ?, duration = ?, location = ?, image_url = ? WHERE id = ?',
      [title, description, price, duration, location, image_url, tourId]
    );
  }

  static async delete(tourId) {
    await db.query('DELETE FROM tours WHERE id = ?', [tourId]);
  }
}

module.exports = Tour;