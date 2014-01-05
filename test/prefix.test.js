
var assert = require('assert/index')
var prefix = require('..')
var dash = prefix.dash

describe('prefix', function(){
  it ('should not prefix things which don\'t need prefixes', function(){
    assert(prefix('border') == 'border')
  })

  it ('may return a prefixed dom style for css3 style like transform', function(){
    assert(prefix('transform') in possibilities('transform'))
  })
  
  it('should memoize results', function(){
    assert(prefix('border') == 'border')
    assert(prefix('border') == 'border')
    assert(prefix('transform') in possibilities('transform'))
    assert(prefix('transform') in possibilities('transform'))
  })

  it ('should throw if it can\'t find a correct key', function(){
    try { prefix('something fucked up') }
    catch (e) { return }
    throw new Error('should not get here')
  })
})

describe('dash', function(){
  it('should create a dasherized string', function(){
    assert(dash('transform') in {
      '-webkit-transform': null,
      '-moz-transform': null,
      '-ms-transform': null,
      '-o-transform': null,
      'transform': null
    })
  })
})

function possibilities(key){
  return 'Moz O ms webkit'.split(' ').map(function(pre){
    return pre + capitalize(key)
  }).concat(key).reduce(function(o, k){
    o[k] = true
    return o
  }, {})
}

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}