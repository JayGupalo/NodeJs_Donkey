const Blog = require('./../models/blog.model');

const createBlog = async (req, res) => {
  try {
    await Blog.create(req.body);

    res.send({ success: true, message: 'Blog created successfully' });
  } catch (error) {
    res.send({ error: true, message: error.message });
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
