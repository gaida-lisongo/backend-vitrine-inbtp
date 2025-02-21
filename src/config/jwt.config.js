require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'inbtp-secret-key',
  expiresIn: '24h'
};