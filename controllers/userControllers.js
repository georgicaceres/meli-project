/**
 *  @fileOverview Middleware controllers for User API.
 *
 *  @author       Georgina Cáceres
 *
 *  @module       userControllers
 *
 *  @requires     NPM:express-validator
 *  @requires     services/crudService.js:crudService
*/

const { validationResult } = require('express-validator/check');
const crudService = require ('../services/crudService');
const userController = {};

/**
 * Render a user list view
 * @module getAll
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 * @static
 */
userController.getAll = (req, res, next) => {
    crudService.getUsers().then(users => {
        res.render('list', { users });
    })
    .catch((err) => res.status(500).send('Error loading users'));
}

/**
 * Add a new user to the database if the data is properly validated and redirect to the user list view
 * @module processData
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 * @static
 */
userController.processData = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render('error', { errors: errors.array() });
        return;
    } else {
        req.body.id = Math.random().toString(36).substring(2, 15);
        crudService.addUser(req.body).then(() => {
            res.redirect('/user/list');
        })
        .catch((err) => res.status(500).send('Error adding new user'));
    };
}


/**
 * AJAX controller to delete a user
 * @module deleteUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 * @static
 */
userController.deleteUser = (req, res, next) => {
    crudService.deleteUser(req.params.id)
    .catch((err) => res.status(500).send('Error deleting user'))
}

/**
 * AJAX controller to edit a user
 * @module deleteUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 * @static
 */
userController.editUser = (req, res, next) => {
    crudService.editUser(req.body, req.params.id)
    .catch((err) => res.status(500).send('Error editing user'))
}

module.exports = userController;
