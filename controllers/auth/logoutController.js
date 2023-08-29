const { logoutModel } = require('../../models/auth/logoutModel');
const asyncHandler = require('express-async-handler');

const userLogout = asyncHandler(async(req, res) => {
    const id = req.id;
    const response = await logoutModel(id);
    res.cookie('accessToken', '', {expires: new Date(0)});
    res.cookie('refreshToken', '', {expires: new Date(0)});

    return res.status(200).json(
        {
            status: 200,
            message: 'Logged out successfully'
        }
    )
})

module.exports = { userLogout }