const { body, validationResult } = require('express-validator');

app.get('/user', 
    body('username').isString().trim().escape(), 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Safe query using parameterized approach or sanitized input
        db.collection('users').findOne({ 
            username: req.query.username 
        }, (err, user) => {
            if (err) return res.status(500).send(err);
            res.json(user || { message: "User not found" });
        });
    }
);
