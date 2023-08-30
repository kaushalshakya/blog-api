const { refreshToken } = require('../controllers/refreshController');

const router = require('express').Router();

router.post('/', refreshToken);

module.exports = router;