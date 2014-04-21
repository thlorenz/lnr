'use strict';

var readdirp = require('readdirp')  
  , through = require('through2')
  , path = require('path')


function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

function filter(dirname, dirFilter) {
  return through.obj(onread);

  function onread(entry, enc, cb) {
    if (path.basename(entry.parentDir) === dirname 
        && dirFilter(entry.parentDir)) this.push(entry);

    cb();
  }
}

function aggregate() {
  var acc = {};
  return through.obj(onread, onend);

  function onread(entry, enc, cb) {
    acc[entry.fullParentDir] = true;
    cb();
  }

  function onend(cb) {
    var self = this;
    Object.keys(acc).forEach(function (k) { self.push(k) });
    cb();
  }
}

function link(linktoDir) {
  var acc = {};
  return through.obj(onread);

  function onread(dir, enc, cb) {
    console.log('linking', dir);
    cb();
  }
}

exports = module.exports = function (root, dirname, linktoDir, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  opts.dirFilter = opts.dirFilter || function () { return true }

  readdirp({ root: root })
    .pipe(filter(dirname, opts.dirFilter))
    .on('error', cb)
    .pipe(aggregate())
    .on('end', cb)
    .on('error', cb)
    .pipe(link(linktoDir))
    .on('error', cb)
    .on('end', cb)
}

exports.isPackage = function (p) {
  var fullPathToParentDir = p.slice(0, -(path.basename(p).length));
  return path.basename(fullPathToParentDir) === 'node_modules';
}

// Test
if (!module.parent && typeof window === 'undefined') {
  exports(__dirname, 'tap', '', { dirFilter : exports.isPackage }, function (err, res) {
    if (err) return console.error(err);
            
    console.log('done');
  });  
}
