import Joi from "joi";
export const signupSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        gender: Joi.string().valid("male", "female").required(),
        intrests: Joi.array().items(Joi.string()).optional(),
        age: Joi.number().required(),
        profileImage:Joi.optional()
    }),
};

export const signinSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
};
