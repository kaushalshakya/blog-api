const pool = require('../../connection');
const asyncHandler = require('express-async-handler');

const loginModel = asyncHandler(async(email, password) => {
    const qb = await pool.get_connection();
    const response = await qb.select('*').from('users').where ({email}).get();
    await qb.release();
    return response;
})

const setRefreshToken = asyncHandler(async(email, refreshToken) => {
    const qb = await pool.get_connection();
    const response = await qb.update('users', {refresh_token: refreshToken}, {email});
    await qb.release();
    console.log(response);
    return response;
})

module.exports = { 
    loginModel,
    setRefreshToken
 }