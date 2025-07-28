const bcrypt = require('bcryptjs');
const { signToken } = require('../middleware/protect');
const Users = require('../models/users');

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: `username ${username} already exists` });
    }

    if (username.length < 6 || password.length < 6) {
      return res.status(400).json({ message: "username and password must have at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 

    const newUser = new Users({ username, password: hashedPassword });
    await newUser.save();

    const token = signToken(newUser._id);
    return res.status(201).json({ message: "User registered successfully", token, username: newUser.username });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await Users.findOne({ username });

    if (username.length < 6 || password.length < 6) {
      return res.status(400).json({ message: "username and password must have at least 6 characters" });
    }

    if (!existingUser) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    const token = signToken(existingUser._id);
    res.status(200).json({ message: "User logged in successfully", token, username: existingUser.username });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {registerUser,loginUser};
