// middleware/auth.js //middleware - for reference
const authenticate = (req, res, next) => {
    // Assume JWT middleware has run and the req.user exists
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    next();
};

app.get('/profile/:userId', authenticate, (req, res) => {
    // Authorization check that users can only access their own profile (admin - does not apply)
    if (req.params.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({ error: "Access denied" });
    }

    User.findById(req.params.userId, (err, user) => {
        if (err) return res.status(500).send(err);
        res.json(user);
    });
});