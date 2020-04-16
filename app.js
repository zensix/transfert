var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const uuid = require('uuid/v4');

var sockIO = require('socket.io')();

// MongoDB
const mongoose = require('mongoose')

var mongoConnectString=process.env.MONGO_CONNECT_STRING || 'mongodb://192.168.88.13:27017/passport'
mongoose.connect(mongoConnectString, {
  useNewUrlParser: true,
  useCreateIndex: true
})


// creation de l'app
var app = express();
app.sockIO = sockIO;

// Middleware

const passportControl = require('./lib/passport-control');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');


// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var socketIORouter = require('./routes/socketio');
var apiRouter = require('./routes/api');
var utilsRouter = require('./routes/utils');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(flash())

app.use(express.static(path.join(__dirname, 'public')));

app.use(passportControl.initialize())
app.use(passportControl.session())
app.locals.globalVariable={dbcon:mongoose}

app.use('/utils',utilsRouter);
app.use('/',indexRouter);
app.use('/users', usersRouter);
app.use('/test/socketio',socketIORouter);
app.use('/api',apiRouter);

global.__basedir = __dirname;




app.get('/test', function(req, res, next) {
  res.render('test-page', { title: 'Test' , myid: req.sessionID , user: req.user});
});





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
