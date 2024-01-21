import Joi from 'joi';
import mongoose  from 'mongoose';

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    if (!req.value) {
      req.value = {}; // create an empty object the request value doesn't exist yet
    }
    req.value["body"] = req.body;
    next();
  };
};


const schemas = {
    authSchema: Joi.object({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().length(11).pattern(/[6-9]{1}[0-9]{9}/).required(),
        //phoneOtp:Joi.string().expiration('2m').optional(),
        //emailOtp:Joi.string().expiration('2m').default(false).optional()
    }),
}

const registraionSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  otp: Joi.string().optional()
});

const eventSchema = Joi.object({
  eventName: Joi.string().optional().allow('').messages({
    'string.base': 'Event name must be a string',
  }),
  eventPic: Joi.string().optional().allow('').messages({
    'string.base': 'Event picture must be a string',
    'string.uri': 'Event picture must be a valid URI',
  }),
  eventInfo: Joi.string().optional().allow('').messages({
    'string.base': 'Event info must be a string',
  }),
  totalAttendance: Joi.string().optional().allow('').messages({
    'string.base': 'Total attendance must be a string',
  }),
  Date: Joi.string().optional().allow('').messages({
    'string.base': 'Date must be a string in ISO date format',
    'string.isoDate': 'Date must be a valid ISO date',
  }),
  location: Joi.string().optional().allow('').messages({
    'string.base': 'Location must be a string',
  }),
  eventVideoUrl: Joi.string().optional().allow('').messages({
    'string.base': 'Event video URL must be a string',
    'string.uri': 'Event video URL must be a valid URI',
  }),
  eventHighlight: Joi.string().optional().allow('').messages({
    'string.base': 'Event highlight must be a string',
  }),
  summary: Joi.string().optional().allow('').messages({
    'string.base': 'Summary must be a string',
  }),
});

const userSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address.',
      'string.empty': 'Email cannot be empty.',
      'any.required': 'Email is required.',
    }),
  first_name: Joi.string().required().messages({
    'string.empty': 'First name cannot be empty.',
    'any.required': 'First name is required.',
  }),
  last_name: Joi.string().required().messages({
    'string.empty': 'Last name cannot be empty.',
    'any.required': 'Last name is required.',
  }),
  gender: Joi.string()
    .required()
    .messages({
      'any.only': 'Gender must be Male, Female, or Other.',
      'any.required': 'Gender is required.',
    }),
  mobile_number: Joi.string()
    .pattern(/[6-9]{1}[0-9]{9}/)
    .optional()
    .messages({
      'string.length': 'Mobile number must be 10 digits long.',
      'string.pattern.base': 'Invalid mobile number format.',
      'any.required': 'Mobile number is required.',
    }),
  role: Joi.string().optional().messages({
    'string.empty': 'Role cannot be empty.',
    'any.required': 'Role is required.',
  }),
  topic: Joi.string().optional().messages({
    'string.empty': 'Topic cannot be empty.',
    'any.required': 'Topic is required.',
  }),
  work_sector: Joi.string().optional().messages({
    'string.empty': 'Work sector cannot be empty.',
    'any.required': 'Work sector is required.',
  }),
  raised_capital: Joi.string()
    .optional()
    .messages({
      'string.empty': 'Raised capital is required.',
      'any.required': 'Raised capital is required.',
    }),
  career_experience_url: Joi.string()
    .optional()
    .messages({
      'string.uri': 'Career experience URL must be a valid URI.',
      'any.required': 'Career experience URL is required.',
    }),
    personal_web_url: Joi.string()
    .optional()
    .messages({
      'string.uri': 'Career experience URL must be a valid URI.',
      'any.required': 'personal_web_url URL is required.',
    }),
});

const validateMongoDbId = (id) =>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error("this id is not valid or not found");
    
}


export { validateRequest, schemas, validateMongoDbId, registraionSchema, eventSchema, userSchema };
