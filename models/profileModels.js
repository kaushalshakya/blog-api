const pool = require('../connection');
const asyncHandler = require('express-async-handler');

var qb;

const getProfile = asyncHandler(async(id) => {
    qb = await pool.get_connection();
    const response = await qb.select('*').from('users').where({id}).get();
    await qb.release();
    return response;
})

const getUserPosts = asyncHandler(async(id) => {
    qb = await pool.get_connection();
    const response = await qb.select('post_title, post_content post_content').from('posts').where({post_author: id}).get();
    await qb.release();
    return response;
})

const putProfile = asyncHandler(async(id, data) => {
    qb = await pool.get_connection();
    const response = await qb.update('users', { 
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        image: data.image
    }, {id})
    await qb.release();
    return response;
})

module.exports = {
    getProfile,
    getUserPosts,
    putProfile
}