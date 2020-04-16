var express = require('express');
var router = express.Router();



router.get('/status', (req, res, next) => {
    data={'status':'ko'}
    if (req.app.locals.globalVariable.dbcon ){
        data.db={"host": req.app.locals.globalVariable.dbcon.connection.host,"port": req.app.locals.globalVariable.dbcon.connection.port, "Connected":req.app.locals.globalVariable.dbcon.connection.readyState};
        data.status="ok"
    }
    res.json(data);
});

module.exports = router;
