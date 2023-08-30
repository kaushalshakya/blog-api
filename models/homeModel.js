const pool = require('../connection');
const asyncHandler = require('express-async-handler');

const getHomePage = asyncHandler(async() => {
    const qb = await pool.get_connection();
    const response = await qb.select(['posts.post_title', 'posts.post_content', 'posts.post_image', 'posts.post_added', 'users.first_name', 'users.last_name'])
                         .from('posts')
                         .join('users', 'posts.post_author = users.id', 'left')
                         .get();
    await qb.release();
    return response;
})

module.exports = { getHomePage }