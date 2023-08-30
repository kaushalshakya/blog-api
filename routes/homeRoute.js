const { homePage } = require('../controllers/homeController');

const router = require('express').Router();

router.get('/', homePage);

module.exports = router;