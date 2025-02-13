const jwt = require("jsonwebtoken");
require("dotenv").config();
// In production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

class JWTService {
  static generateToken(userData) {
    return jwt.sign(userData, JWT_SECRET, { expiresIn: "24h" });
  }
  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}

module.exports = JWTService;
