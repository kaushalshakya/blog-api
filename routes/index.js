const registerRoute = require('./auth/registerRoute');
const loginRoute = require('./auth/loginRoute');
const logoutRoute = require('./auth/logoutRoute');
const postRoutes = require('./postRoutes');
const profileRoutes = require('./profileRoutes');
const homeRoute = require('./homeRoute');
const refreshRoute = require('./refreshRoute');

module.exports = {
    registerRoute,
    loginRoute,
    logoutRoute,
    postRoutes,
    profileRoutes,
    homeRoute,
    refreshRoute
}