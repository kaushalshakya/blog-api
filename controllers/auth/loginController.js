const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { 
    loginModel, 
    setRefreshToken 
} = require('../../models/auth/loginModel');
require('dotenv').config();

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json(
            {
                status: 400,
                message: 'Email and password is necessary for login' 
            }
        )
    }

    const checkUser = await loginModel(email,password);

    if(checkUser.length < 1) {
        return res.status(404).json(
            {
                status: 404,
                message: 'User not found'
            }
        )
    }

    if(!bcrypt.compareSync(password, checkUser[0].password)) {
        return res.status(400).json(
            {
                status: 400,
                message: 'Invalid credentials'
            }
        )
    }


    const accessToken = jwt.sign(
        {
            id: checkUser[0].id,
            first_name: checkUser[0].first_name,
            last_name: checkUser[0].last_name,
            image: checkUser[0].image,
            email: checkUser[0].email
        },
        process.env.ACCESS_TOKEN,
        // {expiresIn: '20s'}
    )

    console.log(accessToken);
    
    const refreshToken = jwt.sign(
        {
            id: checkUser[0].id,
            first_name: checkUser[0].first_name,
            last_name: checkUser[0].last_name,
            image: checkUser[0].image,
            email: checkUser[0].email
        },
        process.env.REFRESH_TOKEN,
        // {expiresIn: '20m'}
        )
    

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: false });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });

    setRefreshToken(email, refreshToken);

    return res.status(200).json(
        {
            status: 200,
            message: 'Logged in successfully!',
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    )
})

module.exports = { loginUser }