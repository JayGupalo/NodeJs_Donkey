const Blog = require('./../models/blog.model');

const { createBlogSchema } = require('../validations/blog.validations');

const createBlog = async (req, res) => {
  try {
    const value = await createBlogSchema?.body.validateAsync(req.body);
    await Blog.create(value);

    res.send({ success: true, message: 'Blog created successfully' });
  } catch (error) {
    res.send({ error: true, message: error });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
};

module.exports = { createBlog, getBlogs };
