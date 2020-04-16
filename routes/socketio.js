var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('test-page', { title: 'Test' });
  });

router.get('/toto', (req, res, next) => {
    console.log("in route socketio")
    const io = req.app.sockIO
    io.emit('Message', { my: 'data' }) //emit to everyone
    res.send("OK")
});

module.exports = router;
