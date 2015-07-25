var urlQuery = require('./')
var test = require('tape')

test('should append query string object', function (t) {
  run('http://foo.com/?filter=true', '?', 'http://foo.com/', 'clears query')
  run('http://foo.com/path?filter=true', '?', 'http://foo.com/path', 'clears query')
  run('http://foo.com/path/?filter=true', '?', 'http://foo.com/path/', 'clears query')
  run('http://foo.com?filter=true', '?', 'http://foo.com', 'clears query')
  run('http://foo.com/index.html?filter=closed#about', '?', 'http://foo.com/index.html#about', 'clears query')
  
  run('http://foo.com/?foo=bar', undefined, 'http://foo.com/?foo=bar', 'falsey has no effect')
  run('http://foo.com/?foo=bar', '', 'http://foo.com/?foo=bar', 'falsey has no effect')
  
  run('http://foo.com/?filter=true', 'filter=false', 'http://foo.com/?filter=false')
  run('http://foo.com/', 'foo=bar', 'http://foo.com/?foo=bar')
  run('http://foo.com/?', 'foo=bar', 'http://foo.com/?foo=bar')
  run('http://foo.com/?blah', 'foo=bar', 'http://foo.com/?foo=bar')
  run('http://foo.com', 'foo=bar', 'http://foo.com/?foo=bar')
  run('http://foo.com', 'foo=bar', 'http://foo.com/?foo=bar')
  run('http://foo.com', '', 'http://foo.com')
  run('http://foo.com', '?foo=bar', 'http://foo.com/?foo=bar', 'leading symbols')
  run('http://foo.com', '?', 'http://foo.com', 'no change when clearing query that doesn\'t exist')
  run('http://foo.com/blah', 'foo=bar', 'http://foo.com/blah?foo=bar')
  run('http://foo.com/blah/', 'foo=bar', 'http://foo.com/blah/?foo=bar')
  run('http://foo.com/blah?asdf=123#home', 'foo=bar', 'http://foo.com/blah?foo=bar#home')
  run('http://foo.com/blah/?asdf=123#home', 'foo=bar', 'http://foo.com/blah/?foo=bar#home')
  
  t.end()
  
  function run (url, query, expected, msg) {
    t.equal(urlQuery(url, query), expected, msg)
  }
})
