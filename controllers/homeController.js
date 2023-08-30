const asyncHandler = require('express-async-handler');
const {
    getHomePage
} = require('../models/homeModel');

const homePage = asyncHandler(async (req, res) => {
    const response = await getHomePage();
    return res.status(200).json({
        status: 200,
        message: 'Welcome user!',
        response: response
    })
})

module.exports = { homePage }