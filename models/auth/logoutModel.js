const pool = require('../../connection');
const asyncHandler = require('express-async-handler');

const logoutModel = asyncHandler(async(id) => {
    const qb = await pool.get_connection();
    const response = await qb.update('users', { refresh_token: null }, {id});
    await qb.release();
    return response;
})

module.exports = { logoutModel }