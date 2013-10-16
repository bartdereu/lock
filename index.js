var domready  = require('domready');
var Auth0     = require('auth0-js');
var qwery     = require('qwery');
var bonzo     = require('bonzo');
var fs        = require('fs');
var insertCss = require('insert-css');

var loginTmpl = require('./widget/html/login.html');

domready(function () {
  var options = {
    domain:      'mdocs.auth0.com',
    clientID:    '0HP71GSd6PuoRYJ3DXKdiXCUUdGmBbup', 
    callbackURL: 'http://localhost:3000/',
    mode:        'notloggedin'
  };

  var auth0 = Auth0({
    clientID:     options.clientID, 
    callbackURL:  options.callbackURL,
    domain:       options.domain
  });

  var $ = function (selector, root) {
    return bonzo(qwery(selector, root));
  };

  // initialize
  var loginCss = fs.readFileSync(__dirname + '/widget/css/login.css');
  insertCss(loginCss);

  var div = document.createElement('div');
  div.innerHTML = loginTmpl({
    mode: options.mode
  });

  document.body.appendChild(div);
});
