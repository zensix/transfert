const express = require('express'),
      Project = require('../models/User'),
      router = express.Router()


router.use(function (req, res, next) {
    if ( !req.isAuthenticated() ) {
        res.redirect('/login')
        return
    }

    if ( !req.isAuthenticated() || req.user.username != "admin") {
      res.redirect('/login')
      return
    }


  //  if( !req.user.admin &&  req.user.username != 'admin') {
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

module.exports = router