var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sockIO = require('socket.io')();

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var socketIORouter = require('./routes/socketio') 

// creation de l'app
var app = express();
app.sockIO = sockIO;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test/socketio',socketIORouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

sockIO.on('connection', function(socket){
  console.log('A client connection occurred!');
  socket.emit('message', 'Vous êtes bien connecté !');
  socket.on('client_message', function(message){
    console.log('A client message occurred!');
    socket.emit('message', 'le Message :"'+message +'" a bien ete recu par le serveur')
  });
});


module.exports = app;
