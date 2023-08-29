const pool = require('../connection');
const asyncHandler = require('express-async-handler');

var qb;

const getProfile = asyncHandler(async(id) => {
    qb = await pool.get_connection();
    const response = await qb.select('first_name, last_name, email, image').from('users').where({id}).get();
    await qb.release();
    return response;
})

module.exports = {
    getProfile
}