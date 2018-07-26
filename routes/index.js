var express = require('express');
var router = express.Router();

/**
 *  @fileOverview Routes for user API
 *
 *  @author       Georgina Cáceres
 *  @module       Home Route
 *
 *  @requires     NPM:express
*/

/**
 * Route serving home page
 *
 * @name GET home page
 * @path {GET} /
 *
 * @response {html} html Render home page
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MELI TEST' });
});

module.exports = router;
