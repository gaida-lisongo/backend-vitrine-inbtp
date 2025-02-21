const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).send({
            status: false,
            message: "Aucun token fourni!"
        });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), jwtConfig.secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            status: false,
            message: "Token non valide ou expiré!"
        });
    }
};

module.exports = {
    verifyToken
};