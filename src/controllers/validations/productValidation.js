import Joi from "joi";

const productValidation = new Joi.object({
  title: Joi.string().min(4).trim().required(),
  price: Joi.number().min(10).required(),
  description: Joi.string().trim().min(4).required(),
});

export default productValidation;
