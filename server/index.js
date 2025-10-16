const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // for password hashing
const db = require('./db'); // connection file

const app = express();
app.use(cors()); // allows react to talk to backend
app.use(bodyParser.json());

// sign up
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.execute(
            'INSERT INTO users (username, password_hash) VALUES (?, ?)',
            [username, hashedPassword]
        );
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error registering user.' });
    }
});

// sign in
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute(
            'SELECT password_hash FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).send({ message: 'Invalid username or password.' });
        }

        const user = rows[0];
        // compare the provided password with stored hash
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
            res.status(200).send({ message: 'Login successful!', user: { username } });
        } else {
            res.status(401).send({ message: 'Ivalid username or password.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error during login.' });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

