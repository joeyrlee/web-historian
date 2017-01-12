var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

// var actions = {
//   'GET': function(req, res) {
//   },
//   'OPTIONS': function(req, res) {
//     //??
//   },
//   'POST': function(req, res) {

//   }
// };

exports.handleRequest = function (req, res) {
  //find the method from the request
  //assign a callback for that specific method
  //call the serveAssets function
  // if (action) {
  //   return action(req, res);
  // } else {
    //exports.sendResponse(res, '', 404);
  // }
  httpHelp.serveAssets(res, '/index.html', function() {
    console.log('end');
  });
};

