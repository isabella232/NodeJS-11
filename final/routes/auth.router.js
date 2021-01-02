const router = require('express').Router();
const bcrypt = require('bcrypt');
const {getConn} = require('../model/pool');
const jwt  = require('jsonwebtoken');
require('dotenv').config();

router.post('/login',async (req,res,next)=>{
    let conn;
    let result;
    try{
        conn = await getConn();
        const {email, password} = req.body;
        const [[user]]= await conn.query(`select * from user where email=?`,[email]);
        if(!user) result = {success: false, message: '없는 이메일'}

        if(await bcrypt.compare(password,user.password)){
            // 로그인 로직
            const token = await jwt.sign({id: user.id, email: user.email, name: user.name}, process.env.SECRET_KEY)
            result = {success: true, token}
        } else {
            // 로그인 실패
            result = {success: false, message: '비번 틀림'}
        }

    }catch(e){
        next(e);
    }finally {
        if(conn) conn.release();
        res.status(201).json(result);
    }    
});

router.post('/register',async(req,res,next)=>{
    let conn;
    try{
        conn = await getConn();
        const {email,name,password} = req.body;
        const hashPw = await bcrypt.hash(password, await bcrypt.genSalt());
        await conn.execute(`
            insert into user(email, name, password) values(?,?,?)`,[email, name, hashPw]);
    }catch(e){
        next(e);
    }finally {
        if(conn) conn.release();
        res.status(201).json({success: true});
    }
});

module.exports = router;