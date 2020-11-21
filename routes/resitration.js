const Joi = require('@hapi/joi');
const registrationValid = (data) =>{
    const schema ={
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(5).required()

};
return Joi.validate(data, schema);

};
const loginValidation = (data) =>{
    const schema ={
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(5).required()

};
return Joi.validate(data, schema);

};
module.exports.registrationValid = registrationValid;
module.exports.loginValidation = loginValidation;

