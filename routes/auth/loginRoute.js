const { loginUser } = require('../../controllers/auth/loginController');

const router = require('express').Router();

router.post('/', loginUser);

module.exports = router;