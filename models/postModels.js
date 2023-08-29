const pool = require('../connection');
const asyncHandler = require('express-async-handler');

var qb;

const createPosts = asyncHandler(async(data) => {
    qb = await pool.get_connection();
    const response = await qb.insert('posts', {
        post_title: data.post_title,
        post_content: data.post_content,
        post_image: data.post_image,
        post_author: data.post_author
    })
    await qb.release();
    return response;
})

module.exports = {
    createPosts
}