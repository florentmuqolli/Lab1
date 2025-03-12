const db = require('../config/db');

class User {
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(user) {
    const { name, email, password } = user;
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return result.insertId;
  }

  static async updateRefreshToken(userId, refreshToken) {
    await db.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, userId]);
  }

  static async findByRefreshToken(refreshToken) {
    const [rows] = await db.query('SELECT * FROM users WHERE refresh_token = ?', [refreshToken]);
    return rows[0];
  }

  static async clearRefreshToken(userId) {
    await db.query('UPDATE users SET refresh_token = NULL WHERE id = ?', [userId]);
  }
}

module.exports = User;