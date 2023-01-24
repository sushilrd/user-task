const Joi = require("joi");

const userSchema = {

    addUser : () => {
        return Joi.object().keys({
            first_name: Joi.required(),
            last_name: Joi.required(),
            email: Joi.required(),
            phone_no: Joi.number().required(),
        });
    },
    getUser : () => {
        return Joi.object().keys({
            id: Joi.required()
        });
    },

};

module.exports = { userSchema };
