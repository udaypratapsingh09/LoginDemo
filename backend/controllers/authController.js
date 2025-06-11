const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendTestEmail = require("../utils/testMail");

const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

module.exports.Signup = async (req, res, next) => {
  try {
    let { email, password, username } = req.body;
    console.log(email);

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "This email is already registered",
      });
    }
    existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({
        success: false,
        message: "This username is already registered",
      });
    }
    console.log("username", username);
    console.log("unhashed password", password);
    password = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password,
      username,
      verified: false,
    });
    const emailToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const link = `${process.env.BASE_URL}/auth/verify-email?token=${emailToken}`;
    console.log(link);
    const emailLink = await sendTestEmail({ username, link });
    console.log(emailLink);

    return res.status(201).json({
      message: "Verification Email Sent",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({
        success: false,
        message: "Username or password missing",
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      console.log("Wrong user");
      return res.json({ success: false, message: "Incorrect credentials" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      console.log("Wrong password");
      return res.json({ success: false, message: "Incorrect credentials" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

// Verify token
module.exports.verifyEmail = async (req, res) => {
  const token = req.query.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });
    if (user) {
      user.verified = true;
      await user.save();
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.status(200).send("Email verified successfully.");
    } else {
      res.status(404).send("User not found.");
    }
  } catch (err) {
    res.status(400).send("Invalid or expired token.");
  }
};
