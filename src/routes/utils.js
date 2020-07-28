const express = require('express'),
      passport = require('passport'),
      User = require('../models/User'),
      router = express.Router(),
      path = require('path'),
      fs = require('fs');
const homedir = require('os').homedir();

function getFiles (dir){
  files_ =  [];
  var files = fs.readdirSync(dir);
  for (var i in files){
      files_.push(files[i]);
      }
  return files_;
}

/* Home */
router.get('/show-icons', (req, res) => {
  
  // Check if a user is logged-in, is authenticated
  if ( !req.isAuthenticated() ) {
    res.redirect('/login')
    return
  }

  res.render('show-icons', {
    title: 'Icons',
    user: req.user,
    iconsdir :  global.__basedir,
    files : getFiles(global.__basedir+'/public/icons')
  })
})


module.exports = router