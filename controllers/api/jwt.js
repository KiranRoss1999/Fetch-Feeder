require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

/* // Dummy user
const users = [
    { username: 'Kiran', password: 'password123' },
    { username: 'Test', password: 'test456' }
]; */

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

app.get('/posts', authenticateToken, (req, res) => {
    // Dummy posts data
    const posts = [
        { username: 'Kiran', title: 'Post 1' },
        { username: 'Test', title: 'Post 2' }
    ];

    const filteredPosts = posts.filter(post => post.username === req.user.username);
    
    res.json(filteredPosts);
});

// Endpoint to authenticate and generate JWT token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    //Check if username and password match a user in your data
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Username or password incorrect' });
    }

    //generate JWT token with username, expires in 2 minutes
    const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '10s' });

    //Send token to the clientt
    res.json({ accessToken });
});

//Middleware  to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token not provided' });
    }

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = authenticateToken;