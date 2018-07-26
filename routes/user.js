/**
 *  @fileOverview Routes for user API
 *
 *  @author       Georgina Cáceres
 *  @module       User API and Routes
 *
 *  @requires     NPM:express
 *  @requires     controllers/userControllers.js:userControllers
 *  @requires     validations/userValidations.js:userValidations
*/

const express = require('express');
const userControllers = require('../controllers/userControllers');
const { validations } = require('../validations/userValidations');
const router = express.Router();


/**
 * Route serving register form.
 *
 * @name GET form
 * @path {GET} /user/form
 *
 * @response {html} html rendring the form
 */
router.get('/form', (req, res, next) => res.render('form'));

/**
 * Route serving user list.
 *
 * @name GET user list
 * @path {GET} /user/list
 *
 * @response {html} html rendring the user list
 */
router.get('/list', userControllers.getAll);

/**
 * Route for new user creation. Redirect to list on success
 *
 * @name POST new user
 * @path {POST} /user
 * @body {string} name The name of the user
 * @body {string} surname The surname of the user
 * @body {string} phone The phone of the user
 * @body {string} email The email of the user
 *
 * @response {string} Ok
 */
router.post('/', validations, userControllers.processData);

/**
 * Delete a user by id.
 *
 * @name DELETE user
 * @path {DELETE} /user/delete/:id
 * @params {string} id User ID
 *
 * @response {string} Ok
 */
router.delete('/delete/:id', userControllers.deleteUser);

/**
 * Edit a user by id.
 *
 * @name EDIT user
 * @path {PUT} /user/put/:id
 * @params {string} id User ID
 *
 * @response {string} Ok
 */
router.put('/put/:id', validations, userControllers.editUser);

module.exports = router;
