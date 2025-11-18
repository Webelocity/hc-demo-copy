import Joi from 'joi';

export interface CheckoutContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    selectedAddresses?: CheckoutSelectedAddresses | null;
}

export const checkoutContactSchema = Joi.object<CheckoutContactFormData>({
    firstName: Joi.string().trim().min(2).max(50).required().messages({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 2 characters',
        'string.max': 'First name cannot exceed 50 characters',
    }),
    lastName: Joi.string().trim().min(2).max(50).required().messages({
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 2 characters',
        'string.max': 'Last name cannot exceed 50 characters',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid email address',
    }),
    phoneNumber: Joi.string().trim().required().messages({
        'string.empty': 'Phone number is required',
    }),
    selectedAddresses: Joi.any().optional(),
});


