const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(user) {
    const { name, email, password, role = 'user' } = user;
  
    if (!name || !email || !password) {
      throw new Error('Missing required fields');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(userId) {
    const [rows] = await db.query('SELECT id, name, email FROM users WHERE id = ?', [userId]);
    return rows[0];
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

  static async getAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  static async update(userId, userData) {
    const { name, email, role } = userData;
    await db.query(
      'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
      [name, email, role, userId]
    );
  }

  static async delete(userId) {
    await db.query('DELETE FROM users WHERE id = ?', [userId]);
  }
}

module.exports = User;