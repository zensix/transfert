const express = require('express'),
      Project = require('../models/Project'),
      router = express.Router()


router.use(function (req, res, next) {
    if ( !req.isAuthenticated() ) {
        res.redirect('/login')
        return
    }
    next();
});

router.get('/', (req, res) => {
    // Check if a user is logged-in, is authenticated
    res.render('project', {
        title: 'Projects',
        user: req.user
    })
})

router.post('/', (req, res) => {
    inputdata=req.body
    inputdata._ownerId=req.user._id
    Project.create(inputdata, function (err, prj) {
        if (err) {
            res.json(err)
        } 
        res.render('project', {
            title: 'Projects',
            user: req.user
        });
    });
});

router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    Project.deleteOne({_id:id},function (err, prj) {
        if (err) return handleError(err);
        res.render('project', {
            title: 'Projects',
            user: req.user
        });
      });
});

router.get('/edit/:id', (req, res) => {
    var id = req.params.id;
    Project.findOne({_id: id}, function (err, prj) {
        if (err) return handleError(err);
        console.log(prj)
        res.render('project-edit', {
            title: 'Projects',
            user: req.user,
            project: prj,
            _id: prj._id
        })
      });
});
    

router.get('/view/:id', (req, res) => {
    var id = req.params.id;
    Project.findOne({_id: id}, function (err, prj) {
        if (err) return handleError(err);
        console.log(prj)
        res.render('project-view', {
            title: 'Projects',
            user: req.user,
            project: prj
        })
      });
});

module.exports = router