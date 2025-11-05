
// server/middleware/roleMiddleware.js


// ✅ roleMiddleware.js
// Restricts routes based on the user's role

module.exports = function (...allowedRoles) {
  return (req, res, next) => {
    try {
      const userRole = req.user.role; // extracted from JWT in authMiddleware
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied: Insufficient privileges" });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: "Role check failed", error: error.message });
    }
  };
};
