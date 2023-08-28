const pool = require('../../connection');
const asyncHandler = require('express-async-handler');

const qb = async () => {
    const response = await pool.get_connection();
    return response;
}