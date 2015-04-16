/*global module, require, process*/
'use strict';

// Modules in use
var registerService = require('../services/RegisterService'); //Initialize and run
var Q = require('q');

/**
  Define the post action for user registration
  Return the new user email and the success status on successful register.
*/
exports.post = function (req, res) {
  registerService.registerUser(req.body)
    .then(function (newUser) {
      res.send({
        email : newUser.email,
        success: true
      });
    })
    .catch(function (errorMessage) {
      res.send({
        success: false,
        reason : errorMessage
      });
    });
};
