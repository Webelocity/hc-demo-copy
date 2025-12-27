import Joi from 'joi';

export interface ReviewFormData {
    firstName: string;
    lastName: string;
    email: string;
    rating: number;
    reviewTitle: string;
    reviewMessage: string;
}

export const reviewFormSchema = Joi.object<ReviewFormData>({
    firstName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'First name is required',
            'string.min': 'First name must be at least 2 characters',
            'string.max': 'First name cannot exceed 50 characters',
        }),
    lastName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Last name is required',
            'string.min': 'Last name must be at least 2 characters',
            'string.max': 'Last name cannot exceed 50 characters',
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address',
        }),
    rating: Joi.number()
        .min(1)
        .max(5)
        .required()
        .messages({
            'number.base': 'Rating is required',
            'number.min': 'Please provide at least 1 star',
            'number.max': 'Rating cannot exceed 5 stars',
            'any.required': 'Rating is required',
        }),
    reviewTitle: Joi.string()
        .min(3)
        .max(120)
        .required()
        .messages({
            'string.empty': 'Review title is required',
            'string.min': 'Title must be at least 3 characters',
            'string.max': 'Title cannot exceed 120 characters',
        }),
    reviewMessage: Joi.string()
        .min(10)
        .max(1000)
        .required()
        .messages({
            'string.empty': 'Please share your review',
            'string.min': 'Review must be at least 10 characters',
            'string.max': 'Review cannot exceed 1000 characters',
        }),
});

