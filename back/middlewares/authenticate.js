const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: data.userId });

    if (!user) {
      return res.status(401).json({ error: "No user found for this token." });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized to access this resource" });
  }
};
