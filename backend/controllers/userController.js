const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');


// **Register User**
exports.register = async (req, res) => {
    try {
      const { username, email, password, role_id } = req.body;
  
      if (!username || !email || !password || !role_id) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      // Create new user
      const newUser = await User.create({ username, email, password, role_id });
  
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
// **Login User**
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

// **Get All Users**
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

