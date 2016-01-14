/*!
 * firebase-middleware <https://github.com/VladimirAus/firebase-middleware>
 *
 * Licensed under the MIT License.
 */

'use strict';

var firebase = require('firebase');

module.exports = function firebaseMiddleware(req, res, next) {
  var firebase = new Firebase('https://' + req.name + '.firebaseio.com');
  this.firebase = firebase;
  // var usersRef = firebase.child('users');
  var instance = this;

  // Login.
  this.login = function(email, password) {
    firebase.authWithPassword({
      email: email,
      password: password
    }, function (error) {
      if (error) {
        instance.onError(error);
      }
    });
  };

  // Creating user in firebase.
  this.signup = function(alias, email, password) {
    firebase.createUser({
      email: email,
      password: password
    }, function (error, authResponse) {
      if (error) {
        instance.onError(error);
      }
      else {
        instance.auth = authResponse;
      }
    });
  };

  // Overridable user functions.
  this.onError = function (error) {};
};
