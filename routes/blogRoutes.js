const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// fetching controllers 
const blogController = require('../controllers/blogController');

// Image Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const imgDateTime = Date().toString().split(" GMT")[0].split(" ").join("").split(':').join().split(",").join("");
        cb(null,  imgDateTime + file.originalname);
    },
});
    
const upload = multer({ storage: storage,
    fileFilter: function (req, file, cb) {
            const extn = path.extname(file.originalname);
            if (extn !== '.png' && extn !== '.jpg' && extn !== '.gif' && extn !== '.jpeg' && extn !== '.svg') {
                return cb(new Error('File uploaded is not an image!'));
            }
            cb(null, true);
            },
        limits: {
            files: 1,
            fileSize: 1024*1024*5,
        }
});

router.get('/', blogController.blog_index);
router.post('/', upload.single('blogImg'), blogController.blog_create_post);
router.get('/create', blogController.blog_create_get);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);
router.post('/like/:id', blogController.blog_like);
module.exports = router;