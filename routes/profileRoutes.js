const { 
    viewProfile, 
    updateProfile,
    removeProfile
} = require('../controllers/profileControllers');

const router = require('express').Router();
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/profile-img');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

router.get('/', viewProfile);
router.put('/', upload.single('image'), updateProfile);
router.delete('/', removeProfile);

module.exports = router;