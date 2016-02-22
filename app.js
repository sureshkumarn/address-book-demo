module.exports=function(){
  var express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser');


  var mongo = require('./models/init-db'),
      routes = require('./routes/index'),
      users = require('./routes/users');

  var app = express();

  //var port = process.env.PORT || 8000;
  app.set('port', process.env.PORT || 8000);

  // view engine setup
  // Since we don't have any rendering engine for views us plain html app.use(express.static(path.join(__dirname, 'views')));
  //app.set('views', path.join(__dirname, 'views'));
  //app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'views')));

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  //app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));


  mongo.init(function (error) {
      if (error)
          throw error;
   //   app.listen(80); //database is initialized, ready to listen for connections
  });


  app.use('/',routes);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

/*
  app.listen(port, function (err) {
    console.log(port);
      if (err) {
          console.error('Error starting server', err);
      } else {
          console.log('Server started');
      }
  });
*/
  return app;
}