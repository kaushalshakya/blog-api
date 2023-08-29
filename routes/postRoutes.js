const { 
    addPost, 
    allPosts,
    updatePosts
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

router.get('/', allPosts);
router.post('/', upload.single('post_image'), addPost);
router.put('/:id', upload.single('post_image'), updatePosts);
router.delete('/');

module.exports = router;