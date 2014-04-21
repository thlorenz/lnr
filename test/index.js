'use strict';
/*jshint asi: true */

var test = require('tap').test
var rmrf = require('rimraf')
var ncp = require('ncp')
var lnr = require('../')
var log = require('npmlog')
log.level = 'silly';

test('\nsetup fixture copy', function (t) {
  rmrf.sync(__dirname + '/fixtures-copy');
  ncp(__dirname + '/fixtures', __dirname + '/fixtures-copy', function (err) {
    if (err) { t.fail(err); return t.end(); }
    t.end()
  })
})

test('\ninitially foo and bar assets are different', function (t) {
  var foo = require('./fixtures-copy/foo')
  var bar = require('./fixtures-copy/bar')
  t.equal(foo, 'installed in foo');
  t.equal(bar, 'installed in bar');
  t.end()
})

test('\nafter linking recursively foo and bar assets are the same', function (t) {
  // wipe cache to ensure that we get freshly required modules
  Object.keys(require.cache)
    .filter(function (k) { return ~k.indexOf('test/fixtures-copy') })
    .forEach(function(k) { delete require.cache[k] });

  lnr( __dirname + '/fixtures-copy'
    , 'assets'
    , __dirname + '/fixtures-copy/assets'
    , { dirFilter : lnr.isPackage }
    , function (err) {
        if (err) { t.fail(err); return t.end(); }
        // seems to not get called reliably during tests, however when run as pure js it is
        // not sure what's going on, the 'end' event (see below) allows working around that
    }
  )
  .on('info', log.info.bind(log, 'lnr'))
  .on('verbose', log.verbose.bind(log, 'lnr'))
  .on('end', function () {
    var foo = require('./fixtures-copy/foo')
    var bar = require('./fixtures-copy/bar')

    t.equal(foo, 'original', 'foo is linked to original assets')
    t.equal(bar, 'original', 'bar is linked to original assets')
    t.end()
  })
})

test('\ncleanup fixture copy', function (t) {
  rmrf.sync(__dirname + '/fixtures-copy');
  t.end() 
})
