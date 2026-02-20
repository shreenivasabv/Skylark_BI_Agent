const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1. Get the token from Authorization header
    const authHeader = req.header("Authorization");
    console.log("🔐 Auth middleware - Header received:", authHeader ? "✅ Present" : "❌ Missing");
    
    const token = authHeader?.split(" ")[1];

    // 2. Check if token exists
    if (!token) {
      console.error("❌ No token found in Authorization header");
      return res.status(401).json({ message: "No token provided" });
    }

    // 3. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    console.log("✅ Token verified for user:", decoded.id);

    // 4. Attach user to request
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Auth error:", err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};