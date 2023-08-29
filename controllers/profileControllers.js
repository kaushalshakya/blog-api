const {
    getProfile
} = require('../models/profileModels');
const asyncHandler = require('express-async-handler');

const viewProfile = asyncHandler(async (req, res) => {
    const id = req.id;
    const response = await getProfile(id);
    return res.status(200).json(
        {
            status: 200,
            message: 'Your details:',
            details: response
        }
    )
})

module.exports = {
    viewProfile
}