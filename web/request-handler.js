var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  siteAssets = archive.paths.siteAssets;
  archivedSites = archive.paths.archivedSites;
  list = archive.paths.list;
  var filePath;
  if (req.url === '/') {
    //site assets
    filePath = siteAssets + req.url + 'index.html';
  } else {
    //archivedSites
    filePath = archivedSites + '/' + req.url;
  }
  
  //req.url = /
  if (req.method === 'GET') {
    archive.isUrlArchived(req.url, function(err, exists) {
      if (exists || req.url === '/') {
        httpHelp.serveAssets(res, filePath, function() {
          console.log('end');
        });
      } else {
        res.writeHead(404, exports.headers);
        res.end();
      }
    });
  }

  if (req.method === 'POST') {
    archive.isUrlInList(req.url, function(err, exists) {
      if (!exists) {
        var sentUrl = '';
        req.on('data', function(chunk) {
          sentUrl += chunk;
        });
        req.on('end', function() {
          //sentUrl = JSON.parse(sentUrl);
          sentUrl = sentUrl.slice(4);
          archive.addUrlToList(sentUrl + '\n', function(err) {
            res.writeHead(302, exports.headers);
            res.end();
          });
        });  
      }
    });
  } 
};

