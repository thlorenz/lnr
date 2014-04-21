# lnr [![build status](https://secure.travis-ci.org/thlorenz/lnr.png)](http://travis-ci.org/thlorenz/lnr)

Recursively soft links all occurrences of a directory to another one.

```sh
lnr ../myapp-core ../core --filter isPackage
```

## Installation

    npm install lnr

```
usage: lnr <linktoDir> <dirname> -- <lnr-options>

  Links all directories with name <dirname>, found recursively from the current dir, to the <linktoDir>.
  If dirname is not supplied it defaults to the name of the directory being linked to.

OPTIONS:

  -l, --loglevel  level at which to log: silly|verbose|info|warn|error|silent -- default: info

  -f, --filter    additional filters to apply to than just matching <dirname>
                  currently existing filters are:
                    - isPackage: matches if the directory contains an npm package, i.e. the parent
                      directory is node_modules
  
  -h, --help      Print this help message.


EXAMPLES:
  
  Link all directories with name mydir to the directory of the same name that is a sibling of my current working dir
    
    lnr ../mydir mydir

  Same as above, but omitting the dirname since it is the same as the name of the directory being linked to
    
    lnr ../mydir mydir

  Link all directories with name mydir to the directory of the same name that is a sibling of my current working dir and
  an npm package and log verbose.
    
    lnr ../mydir mydir --filter isPackage -l verbose
```

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="lnr"><span class="type-signature"></span>lnr<span class="signature">(root, dirname, linktoDir, opts, cb)</span><span class="type-signature"> &rarr; {Object}</span></h4>
</dt>
<dd>
<div class="description">
<p>Starts at given <code>root</code> and recurses into all subdirectories.
Each directory found whose name matches <code>dirname</code> is linked to <code>linktoDir</code>.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>root</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"><p>directory at which to start searching</p></td>
</tr>
<tr>
<td class="name"><code>dirname</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"><p>directory to link</p></td>
</tr>
<tr>
<td class="name"><code>linktoDir</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"><p>destination directory to link to</p></td>
</tr>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options that allow customizing which directories are linked</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>dirFilter</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>if provided only directories for which this
function returns <code>true</code> are linked</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>called back when all directories were linked</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/lnr/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/lnr/blob/master/index.js#L68">lineno 68</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>event emitter that emits events about the linking progress <code>info|verbose|warn|error</code></p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Object</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="lnr::isPackage"><span class="type-signature"></span>lnr::isPackage<span class="signature">(p)</span><span class="type-signature"> &rarr; {boolean}</span></h4>
</dt>
<dd>
<div class="description">
<p>A built in filter that returns <code>true</code> if the directory is considered an npm package.
This is determined by ensuring that the parent directory is <code>node_modules</code></p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>p</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"><p>full path to the directory to test</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/lnr/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/lnr/blob/master/index.js#L108">lineno 108</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p><code>true</code> if it is a package, otherwise <code>false</code></p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">boolean</span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
