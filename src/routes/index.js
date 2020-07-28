const express = require('express'),
      passport = require('passport'),
      User = require('../models/User'),
      router = express.Router()

/* Home */
router.get('/', (req, res) => {
  // Check if a user is logged-in, is authenticated
  if ( !req.isAuthenticated() ) {
    res.redirect('/login')
    return
  }
  
  res.render('index', {
    title: 'Home',
    user: req.user
  })
})

/* Signup */
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Signup' })
})


/* Login */

router.get('/login', (req, res, next) => {
  res.render('login',  {user: req.user, message: req.flash('error')});
})


router.post('/login', passport.authenticate('local',{ failureRedirect: '/user/login', failureFlash: true }), (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, person) => {
    res.redirect('/')
  })
});

router.post('/signup', (req, res) => {
  User.register(new User({
    username: req.body.username,
    email: req.body.email
  }),
  req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        err: err
      });
    } else {
      passport.authenticate('local')(req, res, () => {
        User.findOne({
          username: req.body.username
        }, (err, person) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            success: true,
            status: 'Registration Successful!',
          });
        });
      })
    }
  })
});



/* Logout */
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('session-id');
        res.redirect('/')
      }
    });
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

/* Logout */
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' })
});


module.exports = router