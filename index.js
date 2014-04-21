'use strict';

var readdirp = require('readdirp')
  , through  = require('through2')
  , path     = require('path')
  , fs       = require('fs')
  , rmrf     = require('rimraf')
  , EE       = require('events').EventEmitter

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
    this.push(null);
    cb();
  }
}

function link(events, linktoDir) {
  var acc = {};
  return through.obj(onread, onend);

  function onread(dir, enc, cb) {
    if (dir === linktoDir) {
      events.emit('warn', 'Skipping "%s" since cannot link a dir to itself', dir);
      return cb();
    }

    events.emit('info', 'Linking "%s" to "%s"', dir, linktoDir);
    events.emit('verbose', 'Removing "%s"', dir);

    rmrf(dir, function (err) {
      if (err) return cb(err);
      events.emit('verbose', 'Removed "%s"', dir);
      events.emit('verbose', 'Performing symlink');
      fs.symlink(linktoDir, dir, cb);
    })
  }

  function onend(cb) {
    events.emit('info', 'Linked all directories matching the filter');
    events.emit('end');
    cb();
  }
}

exports = module.exports = function (root, dirname, linktoDir, opts, cb) {
  var events = new EE();

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  opts.dirFilter = opts.dirFilter || function () { return true }

  readdirp({ root: root })
    .on('error', cb)
    .pipe(filter(dirname, opts.dirFilter))
    .on('error', cb)
    .pipe(aggregate())
    .on('error', cb)
    .pipe(link(events, linktoDir))
    .on('error', cb)
    .on('end', cb)

  return events;
}

exports.isPackage = function (p) {
  var fullPathToParentDir = p.slice(0, -(path.basename(p).length));
  return path.basename(fullPathToParentDir) === 'node_modules';
}
