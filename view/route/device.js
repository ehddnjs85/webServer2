module.exports = function() {
    const express = require('express');
    const router = express.Router();
    const conn = require('../config/db.config.js')();
    const dbconn = conn.init();

    //Devices List
    router.get('/device', function (req, res) {
        let sql = "SELECT * FROM device"
        dbconn.query(sql, function (err, data) {
            res.render("index", {data});
        })
    })

    //Devices Info List
    router.get('/device/info', function (req, res) {
        res.render("info", { rows : '' } );
    });

    router.post('/device/info', function (req, res) {
        console.log(req.body);

        let data = {
            serialNo : req.body.serialNo,
            deviceName : req.body.deviceName,
            Mvendor : req.body.Mvendor,
            serviceName : req.body.serviceName,
            connUrl : req.body.connUrl,
            fwVer : req.body.fwVer,
            status : req.body.status,
            properPress : req.body.properPress,
            carNum : req.body.carNum,
            carType : req.body.carType,
            tireSize : req.body.tireSize,
            season : req.body.season,
            date : new Date()
        }

        var sql = 'INSERT INTO device SET ?'

        dbconn.query(sql, data, function (err, data) {
            if(err) {
                console.log("err : " , err)
            } else {
                res.send(data);
            }
        });
    });

    //Devices modify List
    router.get('/device/modify/:serialNo', function (req, res) {
        let serialNo = req.params.serialNo;
        console.log("serialNo : " , serialNo)
        // let sql = 'SELECT * FROM device WHERE serialNo = ?';
        let sql = 'SELECT dv.*, ss.sensorId, ss.serialNO, ss.RFId, ss.loc,wearIndex, ss.rePeriod, ss.cost FROM device AS dv JOIN sensor AS ss WHERE dv.serialNo = ss.serialNo AND dv.serialNo = ?;';
        dbconn.query(sql, serialNo, function (err, data) {
            console.log("data : " , data)
            var rows = new Array();

            for (var i = 0; i < data.length; i++){
                // var rows = data[i]
                rows.push(data[i])
            }
            console.log("result : " , rows)
            res.render("info" , {rows} );
        })
    });

    router.post('/device/modify/:serialNo', function (req, res) {

        console.log(res);

        let serialNo = req.params.serialNo;
        let data = {
            deviceName : req.body.deviceName,
            Mvendor : req.body.Mvendor,
            serviceName : req.body.serviceName,
            connUrl : req.body.connUrl,
            fwVer : req.body.fwVer,
            status : req.body.status,
            properPress : req.body.properPress,
            carNum : req.body.carNum,
            carType : req.body.carType,
            tireSize : req.body.tireSize,
            season : req.body.season,
            sensorId : req.body.sensorId,
            RFId : req.body.RFId,
            loc : req.body.loc,
            wearIndex : req.body.wearIndex,
            rePeriod : req.body.rePeriod,
            cost : req.body.cost
        }

        // let sql = 'UPDATE device SET ? WHERE serialNo = ?';
        let sql = 'UPDATE device dv INNER JOIN sensor ss ON dv.serialNo = ss.serialNo SET ? WHERE dv.serialNo = ?'

        dbconn.query(sql, [data, serialNo], function (err, rows) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log(rows)
                res.send(rows);
            }
        });
    });

return router;
};
