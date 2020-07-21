const mongoose = require('mongoose'),
      bcrypt = require('bcrypt')

// Mongoose Model
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    minlength: 2,
    maxlength: 16,
    lowercase: true,
    required: true,

  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
})

// Hash password before saving
userSchema.pre('save', function(next) {
  var user = this

  if ( !user.isModified('password') ) return next()

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

userSchema.methods.toggleadmin = function() {
  var user = this
  user.admin = !user.admin
  this.save()
}

userSchema.methods.toggleactive = function() {
  var user = this
  user.active = !user.active
  this.save()
}

// Password verification
userSchema.methods.login = function(password) {
  var user = this
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
      if ( err ) { reject(err) }
      resolve()
    })
  })
}

// Export Mongoose "User" model
module.exports = mongoose.model('User', userSchema)
