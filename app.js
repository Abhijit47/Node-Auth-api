const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'this is my very secret key',
  resave: false,
  saveUninitialized: true,
}));

// Mock user data (replace this with a database in a real-world scenario)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.userId = user.id; // Set the user ID in the session
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Signup endpoint
app.post('/signup', (req, res) => {
  // Implement user registration logic here (e.g., add user to the database)
  // For simplicity, let's assume the user is added successfully
  res.status(200).send('Signup successful');
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).send('Logout successful');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
