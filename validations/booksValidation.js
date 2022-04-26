const Joi = require('joi');

module.exports = bookValidation = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    genre: Joi.string().min(5).max(20),
    author: Joi.string().min(2).max(30).required(),
    read: Joi.boolean()
})