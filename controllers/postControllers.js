const {
    createPosts, 
    readPosts,
    putPosts,
    getPostById,
    deletePost
} = require('../models/postModels');
const asyncHandler = require('express-async-handler');

const addPost = asyncHandler(async(req, res) => {
    const id = req.id;
    console.log(id);
    const image = req.file;

    if(!req.body.post_title && !req.body.post_content && !req.body.post_image) {
        return res.status(400).json(
            {
                status: 400,
                message: 'Your post cannot be empty'
            }
        )
    }

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

const allPosts = asyncHandler(async(req, res) => {
    const response = await readPosts();

    return res.status(200).json(
        {
            status: 200,
            message: 'All posts:',
            data: response
        }
    )
})

const updatePosts = asyncHandler(async(req, res) => {
    const postId = req.params.id;
    const image  = req.file;

    const checkAuthor = await getPostById(postId);

    const data = {
        post_title: req.body.post_title,
        post_content: req.body.post_content,
        post_image: image? image.filename : checkAuthor[0].post_image,
    }


    console.log(checkAuthor);

    if(checkAuthor[0].post_author !== req.id) {
        return res.status(400).json(
            {
                status: 400,
                message: 'This post does not belong to this user'
            }
        )
    }
    
    await putPosts(postId, data);

    return res.status(200).json(
        {
            status: 200,
            message: 'Post has been updated successfully'
        }
    )

})

const removePost = asyncHandler(async(req, res) => {
    const id = req.params.id;

    const checkAuthor = await getPostById(id);

    if(checkAuthor[0].post_author !== req.id) {
        return res.status(400).json(
            {
                status: 400,
                message: 'This post does not belong to this user'
            }
        )
    }

    await deletePost(id);

    return res.status(200).json(
        {
            status: 200,
            message: 'Post deleted successfully'
        }
    )
})

module.exports = {
    addPost,
    allPosts,
    updatePosts,
    removePost
}