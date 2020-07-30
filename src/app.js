var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');

var sockIO = require('socket.io')();

// MongoDB
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var socketIORouter = require('./routes/socketio');
var apiRouter = require('./routes/api');
var projectRouter = require('./routes/project');

var mongoConnectString=process.env.MONGO_CONNECT_STRING
//var mongoConnectString='mongodb://root:root@mongo:27017/projectform'
//mongoConnectString=process.env.MONGO_CONNECT_STRING+'?authSource=mongo&w=1'
MONGODB_USER = process.env.MONGODB_USER || "admproject"
MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "admproject"
DATABASE_SERVICE_NAME = process.env.DATABASE_SERVICE_NAME || "192.168.88.13"
MONGODB_DATABASE = process.env.MONGODB_DATABASE || "projectform"
mongoConnectString="mongodb://"+MONGODB_USER+":"+MONGODB_PASSWORD+"@"+DATABASE_SERVICE_NAME+":27017/"+MONGODB_DATABASE
mongoose
    .connect(mongoConnectString, { useNewUrlParser: true,  useUnifiedTopology: true  , useCreateIndex: true, useFindAndModify:false})
    .then(console.log(`MongoDB connected ${mongoConnectString}`))
    .catch(err => console.log(err));


// creation de l'app
var app = express();
app.sockIO = sockIO;





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(session({
  name: 'session-id',
  secret: '123-456-789',
  saveUninitialized: false,
  resave: false
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(flash())
// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.locals.globalVariable={dbcon:mongoose}


app.use('/',indexRouter);
app.use('/api',apiRouter);
app.use('/project',projectRouter);
app.use('/user',usersRouter);




app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/malihu-custom-scrollbar-plugin', express.static(__dirname + '/node_modules/malihu-custom-scrollbar-plugin'));
app.use('/popper',express.static(__dirname +'/node_modules/@popperjs/core/dist'));
app.use('/bootstrap-icons.svg',express.static(__dirname +'/node_modules/bootstrap-icons/bootstrap-icons.svg'));
app.use('/icons',express.static(__dirname +'/node_modules/bootstrap-icons/icons'));
// Configure passport-local to use account model for authentication

const User = require('./models/User');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

global.__basedir = __dirname;

// check if admin exist
User.findByUsername("admin").then(function(sanitizedUser) {
  if(sanitizedUser == null){
    console.log("create admin")
    User.register(new User({username: "admin", email: "" , admin: true}), "admin" , ( err, user) => {
        if(err) console.log(err)
        console.log("user: admin password:admin created.")
    })
  }
})

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
