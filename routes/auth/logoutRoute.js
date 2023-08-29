const { userLogout } = require('../../controllers/auth/logoutController');

const router = require('express').Router();

router.post('/', userLogout);

module.exports = router;