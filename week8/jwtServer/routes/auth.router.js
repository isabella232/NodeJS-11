const users = require('../database/users');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/jwt.config').secretKey;


router.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    // 1. 이메일로 유저가 있는지 select
    const user = users.find((user)=>{user.email == email});
    // 1-1. 실패했다면 404
    if(!user) res.status(404).json({success: false, message: '이메일이 존재하지 않습니다.'});
    // 2. 유저가 존재하면 비밀번호 비교하기
    else{
        if(await bcrypt.compare(password, user.password)){
            // 2-1. access token 만들기
            const token = jwt.sign({userId: user.id}, secretKey );
            // 3. 로그인 성공 응답하기 201(token 넘겨주기)
            res.status(201).json({success: false, message: '로그인 성공입니다.', token});
        } else{
            // 2-1. 비밀번호가 틀리면 403
            res.status(403).json({success: false, message: '비밀번호가 틀립니다.'});
        }
    }
});

router.post('/register', async (req,res)=>{
    const {email, password} = req.body;
    // 1. DB에 이메일 있는지 확인
    const user = users.find((user)=>{user.email === email});
    if(user) res.status(404).json({success: false, message: '가입한 유저입니다.'});
    else{
        // 2. 비밀번호 암호화 -> crypto, bcrypt, argon2
        const salt = await bcrypt.genSalt(10);
        const encryptionPassword = await bcrypt.hash(password,salt);
        // 3. 기존 이메일과 암호화된 비밀번호를 insert
        users.push({id: users[users.length-1].id+1, email, password: encryptionPassword});
        // 4. 회원가입 성공 응답하기 201
        res.status(201).json({success: true, message: '회원가입 성공했습니다.'});
    }
});

module.exports= router;
