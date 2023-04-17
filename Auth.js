const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Set up a secret key for JWT
const secretKey = 'mysecretkey';

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check user role
const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

// Login route
app.post('/login', (req, res) => {
  // Get username and password from request body
  const { username, password } = req.body;

  // Check if the user exists in the database and if the password is correct
  const user = users.find((user) => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token
  const token = jwt.sign({ username: user.username, role: user.role }, secretKey);

  // Return the token
  res.json({ token });
});

// Protected route
app.get('/protected', verifyToken, checkRole('admin'), (req, res) => {
  res.json({ message: 'This is a protected route' });
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
