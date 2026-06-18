const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blog.routes');
const { getBlogs, createBlog } = require('./controller/blog.controller');

const config = require('./config/config');

mongoose.connect(config.dbConnection).then(() => {
  console.info('connected to database');
});

app.use(express.json());
app.use(blogRouter);

app.listen(config.port, () => {
  console.info(`server listening to ${config.port}`);
});
