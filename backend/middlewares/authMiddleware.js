const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.verifyUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ success: false, message: "token not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    } else {
      const user = await User.findById(data.id);
      if (!user) return res.json({ success: false, message: "user not found" });
      if (!user.verified) {
        console.log("user not verified");
        return res.json({
          success: true,
          username: user.username,
          verified: false,
          userId: user._id,
        });
      } else
        return res.json({
          success: true,
          username: user.username,
          verified: true,
          userId: user._id,
        });
    }
  });
};
