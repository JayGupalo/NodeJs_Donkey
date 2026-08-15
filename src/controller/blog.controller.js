const { createBlogSchema } = require('../validations/blog.validations');
const { blogService } = require('../services');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const createBlog = catchAsync(async (req, res) => {
  await blogService.createBlog(req.body);
  res
    .status(httpStatus.default.CREATED)
    .send({ success: true, message: 'Blog creates ez' });
});

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getBlogs(req.body);
  res.status(httpStatus.default.OK).json(blogs);
});

module.exports = { createBlog, getBlogs };
