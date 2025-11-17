import Joi from 'joi';
import { matchIsValidTel } from 'mui-tel-input';


export const addressFormSchema = Joi.object<AddressFormValues>({
    label: Joi.string().trim().min(2).max(60).required().messages({
        'string.empty': 'Address name is required',
        'string.min': 'Address name must be at least 2 characters',
        'string.max': 'Address name cannot exceed 60 characters',
    }),
    phoneNumber: Joi.string()
        .trim()
        .required()
        .custom((value, helpers) => {
            if (!matchIsValidTel(value ?? '')) {
                return helpers.error('string.invalidPhone');
            }
            return value;
        })
        .messages({
            'string.empty': 'Phone number is required',
            'string.invalidPhone': 'Please enter a valid phone number',
        }),
    country: Joi.string().trim().required().messages({
        'string.empty': 'Country is required',
    }),
    state: Joi.string().trim().required().messages({
        'string.empty': 'State is required',
    }),
    city: Joi.string().trim().required().messages({
        'string.empty': 'City is required',
    }),
    streetAddress: Joi.string().trim().required().messages({
        'string.empty': 'Street address is required',
    }),
    streetAddress2: Joi.string().allow('', null),
    zipCode: Joi.string().trim().min(3).required().messages({
        'string.empty': 'Zip code is required',
        'string.min': 'Zip code must be at least 3 characters',
    }),
});


