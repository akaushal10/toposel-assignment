const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

const PORT = 5000;

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Allow only this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc)
  optionsSuccessStatus: 200,
};

// Enable CORS with options
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Root Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use auth routes
app.use("/api", userRoutes);
app.use("/api", authRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
