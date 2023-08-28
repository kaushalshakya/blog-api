const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {registerUserModel} = require('../../models/auth/registerModel');

const registerUser = asyncHandler(async(req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const image = req.file;

    if(password !== confirmPassword) {
        return res.status(400).json(
            {
                status: 200,
                message: 'Password and confirm password fields are not a match'
            }
        )
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
        image: image? image.filename : null
    }

    await registerUserModel(data);

    return res.status(200).json(
        {
            status: 200,
            message: 'User registered successfully'
        }
    )
})

module.exports = { registerUser }