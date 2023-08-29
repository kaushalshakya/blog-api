const registerRoute = require('./auth/registerRoute');
const loginRoute = require('./auth/loginRoute');
const logoutRoute = require('./auth/logoutRoute');
const postRoutes = require('./postRoutes');
const profileRoutes = require('./profileRoutes');

module.exports = {
    registerRoute,
    loginRoute,
    logoutRoute,
    postRoutes,
    profileRoutes
}