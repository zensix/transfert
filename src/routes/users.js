const express = require('express'),
      User = require('../models/User'),
      router = express.Router()


router.use(function (req, res, next) {
  if ( !req.isAuthenticated() ) {
        res.redirect('/login')
        return
  }
  next();
});

router.get('/', (req, res) => {
    res.render('users', {
        title: 'Utilisateurs',
        user: req.user
    })
})

router.get('/profile', (req, res) => {
  User.findOne({username: req.user.username}, function (err, profile) {
    if(err) console.log(err)
    res.render('profile', {
      title: 'Profile',
      user: req.user,
      profile: profile
      })
  })
})

router.post('/profile', (req, res) => {
  console.log(req.body)
  User.findOneAndUpdate({username: req.user.username},req.body, function (err, profile) {
    if (err) console.log(err);
    res.render('index', {
      title: 'Home',
      user: req.user
    })
  })
})

router.get('/changepassword', (req, res) => {
  User.findOne({username: req.user.username}, function (err, profile) {
    if(err) console.log(err)
    res.render('changepassword', {
      title: 'Profile',
      user: req.user,
      profile: profile
      })
  })
})
router.post('/changepassword', (req, res) => {
  if (req.session) {
    var username = req.session.passport.user
    var oldpassword= req.body.oldpassword
    var newpassword= req.body.newpassword
    User.findByUsername(username).then(function(sanitizedUser) {
      if (sanitizedUser) {
          sanitizedUser.changePassword(oldpassword,newpassword, function(err) {
            if(err) console.error(err);
            sanitizedUser.save();
            res.render('message', {
              title: 'Information',
              user: req.user,
              message: 'password reset successful'
            })
          });
      } else {
        res.render('message', {
          title: 'Information',
          user: req.user,
          message: 'user does not exist'
        })
      }
    }, function(err) {
        console.error(err);
    })
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router