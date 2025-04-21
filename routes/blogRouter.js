const express = require('express');
const { createBlogController, getAllBlog, getBlogById, updateBlogController, deleteBlogController, demSoLuongBlog } = require('../controllers/blogController');

const router = express.Router();

router.post('/create-blog', createBlogController)
router.get('/blogs', getAllBlog)






router.get('/blog/:id', getBlogById)
router.put('/blog/:id', updateBlogController)
router.delete('/blog/:id', deleteBlogController)
router.get('/SLblogs', demSoLuongBlog)

module.exports = router                                                                                   