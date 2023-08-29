const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return res.status(401).json(
            {
                status: 401,
                message: 'Unauthenticated'
            }
        )
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(400).json(
                {
                    status: 400,
                    message: 'Token tampered or expired'
                }
            )
        }
        req.id = decoded.id;
        req.first_name = decoded.first_name;
        req.last_name = decoded.last_name;
        req.image = decoded.image;
        next();
    })
}

module.exports = verifyJwt;