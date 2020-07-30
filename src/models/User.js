var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: false
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
  },
  lob: {
    type: String,
    required: false,
    lowercase: true,
    default: ""
  }
});

UserSchema.methods.toggleadmin = function() {
    var user = this
    user.admin = !user.admin
    this.save()
}

UserSchema.methods.toggleactive = function() {
  var user = this
  user.active = !user.active
  this.save()
}


UserSchema.plugin(passportLocalMongoose,{selectFields : 'username email admin active lob'});

var User = mongoose.model('User', UserSchema);
module.exports = User;

