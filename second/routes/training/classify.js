var express = require('express');
var mysql = require('mysql');
var bodyParser= require('body-parser');
var router = express.Router();

const pool = require('../../config/dbPool');

router.get('/:attendance', (req,res)=>{
    var attendance = req.params.attendance;
    pool.getConnection((error, connection)=>{
        if(error){
            console.log('database error');
            res.status(503).send({result : "fail"});
            connection.release();
        }
        else{
            var firstQuery = "select * from movies where movie_attendance > ?";

            connection.query(firstQuery, [attendance], (err, rows)=>{
                console.log('result' + rows);
                if(err){
                    res.status(500).send({
                        stat: "error",
                        msg: "errroorrrrr"
                    });
                }
                else{
                    res.status(200).send({
                        stat: "success",
                        data: rows,
                        msg: "successful loading movies data"
                    });
                    //connection.end();
                    connection.release();
                    console.log('successful loading movies data');
                }
            });
        }
    });
});

module.exports = router;
