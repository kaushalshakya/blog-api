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

const readPosts = asyncHandler(async () => {
    qb = await pool.get_connection();
    const response = await qb.select(['posts.id','posts.post_title', 'posts.post_content', 'posts.post_image', 'posts.post_added', 'users.first_name', 'users.last_name'])
                         .from('posts')
                         .join('users', 'posts.post_author = users.id', 'left')
                         .get();
    await qb.release();
    return response;
})

const getPostById = asyncHandler(async (id) => {
    qb = await pool.get_connection();
    const response = await qb.select('*').from('posts').where({id}).get();
    await qb.release();
    return response;
}) 

const putPosts = asyncHandler(async(id, data) => {
    qb = await pool.get_connection();
    const response = await qb.update('posts', {
        post_title: data.post_title,
        post_content: data.post_content,
        post_image: data.post_image,
    }, {id});

    await qb.release();
    return response;
})

const deletePost = asyncHandler(async(id) => {
    qb = await pool.get_connection();
    const response = await qb.delete('posts', {id});
    await qb.release();
    return response;
})

module.exports = {
    createPosts,
    readPosts,
    putPosts,
    getPostById,
    deletePost
}