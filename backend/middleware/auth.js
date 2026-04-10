const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  // 1. Check if Secret exists at the moment of request
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("DEBUG: JWT_SECRET IS MISSING IN MIDDLEWARE");
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      // 2. LOG THE EXACT ERROR MESSAGE
      console.log("DEBUG - JWT Error Name:", err.name); // e.g., TokenExpiredError
      console.log("DEBUG - JWT Error Message:", err.message); // e.g., invalid signature
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
