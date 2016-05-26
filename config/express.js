var express = require('express');
module.exports = function() {
  var app = express();
  //ambient configuration
  app.set('port',3000);
  //middleware
  app.use( express.static('./public'));

  return app;
};
