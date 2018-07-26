const { check } = require('express-validator/check');

/**
 *  @fileOverview Methods for server side validation of user data
 *
 *  @author       Georgina Cáceres
 *
 *  @module       userValidations
 *
 *  @requires     NPM:express-validator
*/

/**
 * Email validation regex. Allows for any number of characters before and after the @ and 2 to 4 chatacters in the domain extension
 * @constant
 * @private
 * @static
 * @type {RegExp}
*/
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

/**
 * List of validation rules on the request body params together with corresponding error messages
 * @constant
 * @static
 * @type {array}
*/
const validations = [
    check('name').isLength({ min: 1 }).withMessage('Campo de nombre vacío'),
    check('surname').isLength({ min: 1 }).withMessage('Campo de apellido vacío'),
    check('email').isLength({ min: 1 }).withMessage('Campo de email vacío'),
    check('name').isLength({ max: 30 }).withMessage('Nombre demasiado largo (máx 30 caracteres)'),
    check('surname').isLength({ max: 30 }).withMessage('Apellido demasiado largo (máx 30 caracteres)'),
    check('phone').matches(/^\d*$/).withMessage('Teléfono inválido. Ingrese sólo números'),
    check('email').matches(emailRegex).withMessage('Mail inválido')
];

module.exports = { validations, emailRegex };
