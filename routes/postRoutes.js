const { 
    addPost
} = require('../controllers/postControllers');
const path = require('path');
const router = require('express').Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/post-img');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage});

router.get('/');
router.post('/', upload.single('post_image'), addPost);
router.put('/');
router.delete('/');

module.exports = router;