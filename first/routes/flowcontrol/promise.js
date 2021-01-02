const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const json2csv = require('json2csv').parse;
const {Converter} = require('csvtojson')
const async = require('async');
const router = express.Router();

const csvColumns = ["name", "hashedPwd", "salt", "age"];
const fileName ="./userDB.csv";

router.post('/',(req,res,next)=>{
    const resObj ={
        msg: null,
        data:{
            name: req.body.name,
            hashedPwd: null,
            salt: null,
            age: req.body.age
        }
    };
    let csvData =[];

    return new Promise((fulfill, reject)=>{
        crypto.randomBytes(32,(err,buffer)=>{
            if(err){
                reject(err);
            }
            else{
                fulfill(buffer);
            }
        });
    }).then(salt =>{
    return new Promise((fulfill, reject)=>{
        resObj.data.salt = salt.toString('base64');
        crypto.pbkdf2(req.body.pwd, salt.toString('base64'),100000, 64, 'sha512',(err,hashed)=>{
            if(err){
                reject(err);
            }else{
                fulfill(hashed);
            }
        });
    });
}).then(hashedPwd =>{
    return new Promise((fulfill, reject)=>{
        resObj.data.hashedPwd = hashedPwd.toString('base64');

        fs.access(fileName,(err)=>{
            if(err){
                if(err.code ==="ENOENT"){ // userDB.csv 이 없을 경우 생성
                    csvData.push(resObj.data);

                    const csvObj=json2csv({
                        fields: csvColumns,
                        data: csvData
                    });

                    fs.write(fileName, csvObj, err=>{
                        if(err){
                            reject(err);
                        } else{
                            console.log('csv 생성완료');
                            resObj.msg ="success";
                            res.status(200).send(resObj);
                        }
                    });
                }else{
                    reject(err);
                }
            } else{ //userDB.csv 있을 경우
                const converter = new Converter({});
                converter.fromFile(fileName, (err, result)=>{
                    if(err) reject(err);
                    else {
                        csvData = result;
                        csvData.push(resObj.data);

                        const csvObj = json2csv({
                            fields: csvColumns,
                            data: csvData
                        });

                        fs.write(fileName, csvObj, err=>{
                            if (err) {
                                reject(err);
                            } else {
                                console.log("csv 갱신 완료");
                                resObj.msg = "success";
                                res.status(200).send(resObj);
                            }
                        });
                    }
                });
            }
        });
    });
}).catch(err=>{
    console.log(err);
    resObj.msg = "error";
    res.status(500).send(resObj);
});
});


module.exports = router;
