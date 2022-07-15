const Joi = require("joi");
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

module.exports.todoCreateUpdateSchema = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().label("Title is required").required(),
  });

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    let errors = {};
    error.details.forEach((err) => {
      errors[err.context.key] = err.context.label;
    });
    return res.status(400).json({ success: false, message: "Error occured", errors });
  } else {
    req.body = value;
    next();
  }
};
