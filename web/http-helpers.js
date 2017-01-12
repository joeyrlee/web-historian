var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

//similar to sendResponse
exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  //setting the head and editing the asset
  res.writeHead(200, exports.headers);
  assetRead = archive.paths.siteAssets + asset;
  assetSites = archive.paths.archivedSites;
  assetList = archive.paths.list;
  //read the file
  fs.readFile(assetRead, 'utf8', function(error, content) {
    if (error) {
      console.log('error');
    } else {
      var data = content;
      //write to file
      res.end(JSON.stringify(data));
    }
  });
};

//collectData

//makeActionHandler


// As you progress, keep thinking about what helper functions you can put here!
