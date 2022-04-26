const Joi = require('joi');

const personValidation = Joi.object({
    userName: Joi.string().alphanum().min(6).max(12).required(),
    password: Joi.string().min(8).max(14).required(),
    firstName: Joi.string().regex(/^[a-zA-Z\s]*$/).message("firstname must contain only letters").required(),
    lastName: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    phone: Joi.number(),
    address: Joi.string()
})

module.exports = personValidation;