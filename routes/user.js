const express = require("express");
const router = express.Router();
const JWTService = require("../services/jwtService");
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");
const EncryptService = require("../services/encryptService");
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwiaWF0IjoxNzM4NzI4ODY2LCJleHAiOjE3Mzg4MTUyNjZ9.a_AfEZyvhm8E-psXficQvMMBbthXjPo1_IkH2N2hgac

// Login Route
router.post("/user", async (req, res) => {
  try {
    const { username, password, fullName, gender, dateOfBirth, country } =
      req.body;

    if (
      !username ||
      !password ||
      !fullName ||
      !gender ||
      !dateOfBirth ||
      !country
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Encrypt password
    const hashedPassword = await EncryptService.encryptPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      fullName,
      gender,
      dateOfBirth,
      country,
    });

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
router.get("/user/search", verifyToken, async (req, res) => {
  try {
    const { text } = req.query;
    if (!text) {
      return res.status(400).json({ message: "Search text is required" });
    }

    // Case-insensitive search on username or fullName
    const users = await User.find({
      $or: [
        { username: { $regex: text, $options: "i" } },
        { fullName: { $regex: text, $options: "i" } },
      ],
    }).select("-password"); // Exclude password field

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
