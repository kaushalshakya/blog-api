const { 
    viewProfile
} = require('../controllers/profileControllers');

const router = require('express').Router();

router.get('/', viewProfile);
router.put('/');
router.delete('/');

module.exports = router;