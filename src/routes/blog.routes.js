const express = require('express');
const router = express.Router();
const { getBlogs, createBlog } = require('./../controller/blog.controller');

router.get('/blogs', getBlogs);
router.post('/blog', createBlog);

module.exports = router;
