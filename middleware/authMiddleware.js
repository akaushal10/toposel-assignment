const JWTService = require("../services/jwtService");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided or invalid format",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = JWTService.verifyToken(token);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = verifyToken;
