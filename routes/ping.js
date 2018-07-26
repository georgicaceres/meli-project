/**
 *  @fileOverview Routes for user API
 *
 *  @author       Georgina Cáceres
 *  @module       Ping API
 *
 *  @requires     NPM:express
*/

const express = require('express');
const router = express.Router();

/**
 * Route serving ping-pong
 *
 * @name GET ping-pong
 * @path {GET} /ping
 *
 * @response {string} Pong ping-pong response
 */
router.get('/', function(req, res, next) {
  res.send('Pong');
});

module.exports = router;
