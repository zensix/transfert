var express = require('express');
var router = express.Router();
var Project =  require('../models/Project');
var User =  require('../models/User');


router.get('/status', (req, res, next) => {
    data={'status':'ko'}
    if (req.app.locals.globalVariable.dbcon ){
        data.db={"host": req.app.locals.globalVariable.dbcon.connection.host,"port": req.app.locals.globalVariable.dbcon.connection.port, "Connected":req.app.locals.globalVariable.dbcon.connection.readyState};
        data.status="ok"
    }
    res.json(data);
});

router.get('/projects', (req, res, next) => {
    Project.find({}).
    populate('_ownerId','username').
    exec(function (err, prj) {
        if (err) return handleError(err);
        res.json(prj);
      });
});

router.get('/project', (req, res, next) => {
    inputdata=req.body
    Project.findOne(inputdata).
    populate('_ownerId','username').
    exec(function (err, prj) {
        if (err) return handleError(err);
        res.json(prj);
    });
});

router.get('/project/:id', (req, res, next) => {
    var id = req.params.id;
    Project.findById(id).
        populate('_ownerId','username').
        exec(function (err, prj) {
            if (err) return handleError(err);
            res.json(prj);
        });
});


router.post('/project', (req, res, next) => {
    inputdata=req.body
    inputdata._ownerId=req.user._id
    Project.create(inputdata, function (err, prj) {
        if (err) {
            res.json(err)
        } 
        res.json(prj);
      });
});

router.post('/project/:id', (req, res, next) => {
    console.log("req.body",req.body)
    var inputdata=req.body
    var id = req.params.id;
    Project.findOneAndUpdate({_id:id},inputdata, function (err, prj) {
        if (err) console.log(err);
        res.json(prj);
    });
});

router.post('/project/:id/addtag', (req, res, next) => {
    var inputdata=req.body
    console.log("body",req.body)
    var id = req.params.id;
    Project.findById(id, function (err, prj) {
        prj.addtag(inputdata.key,inputdata.value,function(result){
            res.json(result);
        });
    });
});

router.post('/project/:id/deltag', (req, res, next) => {
    var id = req.params.id;
    Project.findById(id, function (err, prj) {
        prj.deltag(req.body.key,function(result){
            res.json(result);
        });
    });
});

router.delete('/project/:id', (req, res, next) => {
    var id = req.params.id;
    Project.deleteOne({_id:id},function (err, prj) {
        if (err) console.log(err);
        res.json(prj);
      });
});

router.post('/project/:id/addpv', (req, res, next) => {
    var id = req.params.id;
    var inputdata=req.body
    Project.findById(id, function (err, prj) {
        prj.addpv(inputdata)
        res.json(prj)
    });
});
router.post('/project/:id/updatepvc', (req, res, next) => {
    var id = req.params.id
    var inputdata=req.body
    Project.findById(id, function(err, prj) {
        var pvc = prj.pv.id(req.body._id);
        pvc.set(req.body);
    // Using a promise rather than a callback
        prj.save().then(function(savedPost) {
            res.send(savedPost);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    });
});

router.post('/project/:id/removepvc', (req, res, next) => {
    var id = req.params.id
    var pvcid=req.body.pvcid
    Project.findById(id, function(err, prj) {
        prj.pv.pull(pvcid)
    // Using a promise rather than a callback
        prj.save().then(function(savedPost) {
            res.send(savedPost);
        }).catch(function(err) {
            res.status(500).send(err);
        });
    });
});


router.get('/users', (req, res, next) => {
    User.find({}).
    select({ password: 0 }).
    exec(function (err, users) {
        if (err) return handleError(err);
        res.json(users);
      });
});

router.post('/user/switch-admin/:id', (req, res, next) => {
    var id = req.params.id
    User.findById(id).
    exec(function (err, usr) {
        usr.toggleadmin()
        if (err) return handleError(err);
        res.json(usr);
      });
});

router.post('/user/switch-active/:id', (req, res, next) => {
    var id = req.params.id
    User.findById(id).
    exec(function (err, usr) {
        usr.toggleactive()
        if (err) return handleError(err);
        res.json(usr);
      });
});
module.exports = router;
