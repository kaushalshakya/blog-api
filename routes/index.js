const registerRoute = require('./auth/registerRoute');
const loginRoute = require('./auth/loginRoute');
const logoutRoute = require('./auth/logoutRoute');
const postRoutes = require('./postRoutes');

module.exports = {
    registerRoute,
    loginRoute,
    logoutRoute,
    postRoutes
}