/**
 *  @fileOverview Methods for create, read, update and delete user data
 *
 *  @author       Georgina Cáceres
 *
 *  @module       crudService
*/

const fs = require('fs');

const service = {};

/**
 * The full path for the file where information is saved. We use a json encoded user object per line to make appending more efficient
 * @constant
 * @private
 * @static
 * @type {string}
*/
service.filePath = __dirname + '/../public/data/data.txt';

/**
 * Retrieve and return all users from the storage file.
 * @module getUsers
 * @function
 * @async
 * @static
 *
 * @returns {Object[]} The list of all users
*/
service.getUsers = () => new Promise((accept, reject) => {
    fs.readFile(service.filePath, 'utf-8', (err, data) => {
        if (err) reject(err);
        accept(data.split(/\r?\n/).filter(str => str).map(JSON.parse));
    });
});


/**
 * Take an object and save in a file. If no errors, returns 'Ok'
 * @module addUser
 * @function
 * @async
 * @static
 *
 * @param   {object} userData the object with user information.
 *
 * @returns {string}
*/
service.addUser = (userData) => new Promise((accept, reject) => {
    fs.appendFile(service.filePath, JSON.stringify(userData) + '\n', 'utf-8', err => {
        if (err) reject(err);
        accept('Ok');
    });
});

/**
 * Take an array of user data and save in a file. If no errors, returns 'Ok'
 * @module saveUsers
 * @function
 * @async
 * @static
 *
 * @param   {Object[]} users Array of user data
 *
 * @returns {string}
*/
service.saveUsers = (users) => new Promise((accept, reject) => {
    fs.writeFile(service.filePath, users.map(user => JSON.stringify(user) + '\n').join(''), 'utf-8', err => {
        if (err) reject(err);
        accept('Ok');
    });
});

/**
 * Delete a user by id. Because we are using a file for persistance, we need to load everything, modify, and save again.
 * @module deleteUser
 * @function
 * @async
 * @static
 *
 * @param   {string} id Unique ID for the user
 *
 * @returns {string}
*/
service.deleteUser = (id) => {
    return service.getUsers()
        .then(users => service.saveUsers(users.filter(user => user.id != id)));
};



/**
 * Edit a user by id. Because we are using a file for persistance, we need to load everything, modify, and save again.
 * @module editUser
 * @function
 * @async
 * @static
 *
 * @param   {Object} user user edited information.
 * @param   {number} id the user's id
 *
 * @returns {string}
*/
service.editUser = (data, id) => {
    return service.getUsers()
        .then(users => users.map( user => user.id === id ? data : user))
        .then(service.saveUsers);
};

module.exports = service;
