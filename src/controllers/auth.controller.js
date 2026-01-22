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
  const { name, email, mobile, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    mobile,
    password: hash,
    role
  });

  res.json({ success: true, user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = generateToken(
    user,
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRE
  );

  const refreshToken = generateToken(
    user,
    process.env.JWT_REFRESH_SECRET,
    process.env.JWT_REFRESH_EXPIRE
  );

  res.json({ accessToken, refreshToken, user });
};

exports.refreshToken = (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({ accessToken });
  });
};
