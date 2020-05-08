module.exports = function() {
    const express = require('express');
    const router = express.Router();
    const conn = require('../config/db.config.js')();
    const dbconn = conn.init();

    //Devices List
    router.get('/device', function (req, res) {

    })

    //Devices Info 
    router.get('/device/info', function (req, res) {
        var info = device.info();
        res.send(info);
    });

    //Devices add


    //Devices modify

return router;
};
