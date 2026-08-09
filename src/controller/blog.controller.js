const Blog = require('./../models/blog.model');
const { createBlogSchema } = require('../validations/blog.validations');

const catchAsync = require('../utils/catchAsync');

const createBlog = catchAsync(async (req, res) => {
  await Blog.createe(req.body);
  res.send({ success: true, message: 'Blog creates ez' });
});

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

module.exports = { createBlog, getBlogs };
