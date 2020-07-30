const express = require('express'),
      User = require('../models/User'),
      router = express.Router()


router.use(function (req, res, next) {
  if ( !req.isAuthenticated() ) {
        res.redirect('/login')
        return
  }

  if( !req.user.admin) {
      res.render('notauthorized', {
        title: 'Acces non authorisé',
        user: req.user
    })
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


module.exports = router