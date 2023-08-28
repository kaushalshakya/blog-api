const pool = require('../../connection');
const asyncHandler = require('express-async-handler');

var qb; 

const registerUserModel = asyncHandler(async(data) =>{
    qb = await pool.get_connection();
    const response = await qb.insert('Users', {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        image: data.image
    })
    await qb.disconnect();
    return response;
})

module.exports = {registerUserModel}