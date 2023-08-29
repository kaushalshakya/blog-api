const {
    createPosts
} = require('../models/postModels');
const asyncHandler = require('express-async-handler');

const addPost = asyncHandler(async(req, res) => {
    const id = req.id;
    const image = req.file;
    const data = {
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        post_image: image? image.filename : null,
        post_author: id
    }

    await createPosts(data);

    return res.status(200).json(
        {
            status: 200,
            message: 'Post created successfully'
        }
    )
})

module.exports = {
    addPost
}