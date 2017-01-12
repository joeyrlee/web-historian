var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(error, urls) {
    if (error) {
      console.log('error');
    } else {
      callback(error, urls.split('\n'));
    }
  });
};

exports.isUrlInList = function(target, callback) {
  fs.readFile(exports.paths.list, 'utf8', function(error, exist) {
    if (error) {
      console.log('error');
    } else {
      var array = exist.split('\n');
      callback(error, _.contains(array, target));
    }
  });
};

exports.addUrlToList = function(newURL, callback) {
  fs.writeFile(exports.paths.list, newURL, function(error, urls) {
    if (error) {
      console.log('error');
    } else {
      callback(error);
    }
  });
};

exports.isUrlArchived = function(newURL, callback) {
  fs.readFile(`${exports.paths.archivedSites}/${newURL}`, 'utf8', function(err, exists) {
    if (err) {
      callback(null, false);
    } else {
      callback(null, true);
    }    
  });
};

exports.downloadUrls = function(urlArray) {
  urlArray.forEach(url => {
    exports.isUrlArchived(url, function(err, exists) {
      if (!exists) {
        fs.writeFile(`${exports.paths.archivedSites}/${url}`, 'utf8', function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Great job');
          }
        });
      }
    });
  });
};
