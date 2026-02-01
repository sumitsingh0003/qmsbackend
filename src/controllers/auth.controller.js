const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user, secret, expiresIn) =>
  jwt.sign(
    { id: user._id, role: user.role },
    secret,
    { expiresIn }
  );

exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    // 🔴 Mandatory field checks
    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: "Name and password are mandatory"
      });
    }

    // 🔴 At least one required: email or mobile
    if (!email && !mobile) {
      return res.status(400).json({
        success: false,
        message: "Either email or mobile is mandatory"
      });
    }

    // 🔴 Check duplicate email
    if (email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "Email already exists"
        });
      }
    }

    // 🔴 Check duplicate mobile
    if (mobile) {
      const mobileExists = await User.findOne({ mobile });
      if (mobileExists) {
        return res.status(409).json({
          success: false,
          message: "Mobile number already exists"
        });
      }
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email || null,
      mobile: mobile || null,
      password: hash,
      role
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );

  // 🔐 Save refresh token
  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    success: true,
    accessToken,
    refreshToken,
    user
  });
};

exports.logout = async (req, res) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, {
      refreshToken: null
    });

    return res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
};


exports.refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  const user = await User.findOne({ refreshToken: token });
  if (!user) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({ accessToken });
  });
};
