const { setRefreshToken } = require('../models/auth/loginModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const refreshToken = asyncHandler((req, res) => {
   const refreshToken = req.body.token;
   jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async(err, decoded) => {
        if (err) {
            return res.status(400).json(
                {
                    status: 400,
                    message: 'Invalid token'
                }
            )
        }

        const { id, first_name, last_name, image, email } = decoded;
        
        const newAccessToken = jwt.sign(
            {
                id, 
                first_name, 
                last_name, 
                image,
                email
            }, 
            process.env.ACCESS_TOKEN, 
            // {expiresIn: '20s'}
        );
        const newRefreshToken = jwt.sign(
            {
                id, 
                first_name, 
                last_name, 
                image,
                email
            }, 
            process.env.REFRESH_TOKEN, 
            // {expiresIn: '20m'}
        );

        await setRefreshToken(email, newRefreshToken);

        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true });
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });


        return res.status(200).json(
            {
                status: 200,
                message: 'New tokens generated!',
                newAccessToken: newAccessToken,
                newRefreshToken: newRefreshToken
            }
        )
   })
})

module.exports = { refreshToken }