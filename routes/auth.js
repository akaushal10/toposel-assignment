const express = require("express");
const router = express.Router();
const JWTService = require("../services/jwtService");
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");
const EncryptService = require("../services/encryptService");
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNzM4NzI4ODY2LCJleHAiOjE3Mzg4MTUyNjZ9.a_AfEZyvhm8E-psXficQvMMBbthXjPo1_IkH2N2hgac

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "ID and password are required",
    });
  }

  // Example credentials check (replace with actual database check)
  // $2a$10$MiNYmBXILeTCAaJvuDc1IeVtxJW0GChxmyxW8QpesL74ah0vdD0a6
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Invalid username....." });
  }
  const hashedPassword = await EncryptService.encryptPassword(password);
  const isMatch = await EncryptService.comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password...." });
  }
  const token = JWTService.generateToken({ id: username });

  return res.json({
    success: true,
    message: "Login successful",
    token: token,
    username,
  });
});

router.get("/verify", verifyToken, (req, res) => {
  return res.json({
    success: true,
    message: "Token is valid",
    user: req.user,
  });
});

module.exports = router;
