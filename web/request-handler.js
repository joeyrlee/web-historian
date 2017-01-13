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
        archive.readListOfUrls(archive.downloadUrls);
        res.end();
      }
    });
  }

  if (req.method === 'POST') {
    var sentUrl;
    req.on('data', function(chunk) {
      sentUrl = JSON.parse(chunk.toString()).url;
    });
    req.on('end', function() {
      console.log(sentUrl);
      archive.isUrlInList(sentUrl, function(err, exists) {
        if (!exists) {
          archive.addUrlToList(sentUrl + '\n', function(err) {
            res.writeHead(302, exports.headers);
            archive.readListOfUrls(archive.downloadUrls);
            var sentPath = archivedSites + '/' + sentUrl;
            httpHelp.serveAssets(res, sentPath, function() {
              console.log('something');
            });
            res.end();
          });
        }
      });
    });
  }
};
