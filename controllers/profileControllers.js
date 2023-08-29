const {
    getProfile, 
    getUserPosts,
    putProfile,
    deleteProfile
} = require('../models/profileModels');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const viewProfile = asyncHandler(async (req, res) => {
    const id = req.id;
    const response = await getProfile(id);
    const posts = await getUserPosts(id);
    return res.status(200).json(
        {
            status: 200,
            message: 'Your details:',
            details: response,
            posts: posts
        }
    )
})

const updateProfile = asyncHandler(async(req, res) => {
    const id = req.id;
    const image = req.file;
    const profile = await getProfile(id);
    if(!bcrypt.compareSync(req.body.oldPassword, profile[0].password)) {
        return res.status(400).json(
            {
                status: 400,
                message: 'Incorrect password'
            }
        )
    }

    const newPassword = req.body.newPassword;

    const hashPassword = (pw) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pw, salt);
        return hash;
    }

    

    const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: newPassword ? hashPassword(newPassword) : profile[0].password,
        image: image ? image.filename : profile[0].image
    }

    await putProfile(id, data);

    return res.status(200).json(
        {
            status: 200,
            message: 'Profile updated successfully'
        }
    )

})

const removeProfile = asyncHandler(async(req, res) => {
    const id = req.id;
    await deleteProfile(id);  
    return res.status(200).json(
        {
            status: 200,
            message: 'Account deleted successfully'
        }
    )
})

module.exports = {
    viewProfile,
    updateProfile,
    removeProfile
}