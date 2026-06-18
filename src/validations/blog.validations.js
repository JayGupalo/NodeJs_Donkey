const joi = require('joi');

const createBlogSchema = {
  body: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
  }),
};

module.exports = { createBlogSchema };
