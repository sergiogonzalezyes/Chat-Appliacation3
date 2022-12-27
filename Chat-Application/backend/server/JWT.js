const { sign, verify } = require("jsonwebtoken");

const createTokens = (users) => {
    const accessToken = sign(
        { username: users.username },
        "jwtsecretplschange"
    );
    console.log(accessToken);

    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken)
        return res.status(400).json({ error: "user not authenticated" });

    try {
        const validToken = verify(accessToken, "jsonwebtoken");
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

module.exports = { createTokens, validateToken };
