const mongoose = require('mongoose')
// pv schema
var pvSchema = new mongoose.Schema({
  name: { type: String},
  size: { type: Number },
  mode: {type: String, default: "RO" , enum: ['RO', 'RWMany'] },

})

// Mongoose Model
var projectSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  _ownerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created: { type: Date, default: Date.now },
  environnement: { type: String, default: "OAT" , enum: ['OAT', 'PRD'] },
  status: { type: String, default: "Requested" , enum: ['Requested', 'Created'] },
  notes: { type: String, default:""},
  tags: {
    type: Map,
    of: String,
    default:{}
  },
  pv: [ pvSchema ]
})

projectSchema.methods.addpv = function(pv) {
  var prj = this
  prj.pv.push(pv)
  this.save()
}

projectSchema.methods.addtag = function(key,value) {
  var prj = this
  prj.tags.set(key,value)
  prj.save()
}

projectSchema.methods.deltag = function(key) {
  var prj = this
  prj.tags.delete(key)
  prj.save()
}





// Export Mongoose "Project" model
module.exports = mongoose.model('Project', projectSchema)
