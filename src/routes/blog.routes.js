const express = require('express');
const router = express.Router();

const { createBlogSchema } = require('../validations/blog.validations');
const validate = require('../middleware/validate');
const { getBlogs, createBlog } = require('./../controller/blog.controller');

router.get('/blogs', getBlogs);
router.post('/blog', validate(createBlogSchema), createBlog);

module.exports = router;
