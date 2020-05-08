module.exports = function() {
    var mysql = require('mysql');
  
    var conn = {
      host: "192.168.10.9",
      user: "smuser",
      password: "smuser000",
      database: "smtire",
      multipleStatements : true 
    }
    
    var dbconn = {
      init : function() {
        return mysql.createConnection(conn);
      },
      dbopen : function(con) {
        con.connect(function(err) {
            if (err) {
                console.error("mysql connection error : " + err);
            } else {
                console.info("mysql connection successfully.");
            }
        });
      }
    }
    
    return dbconn;
  };