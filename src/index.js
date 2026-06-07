const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blog.routes');
const { getBlogs, createBlog } = require('./controller/blog.controller');
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.info('connected to database');
});

app.use(express.json());
app.use(blogRouter);

app.listen(process.env.PORT, () => {
  console.info(`server listening to ${process.env.PORT}`);
});
