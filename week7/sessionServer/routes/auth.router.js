const router = require('express').Router();
const users = require('../database/user');
const bcrypt = require('bcrypt');

function validator(req,res,next){
    const {email,password} = req.body;
    if(!(email && password)) res.status(400).json({success:false,message: '입력이상'});
    else next();
}

/**
 * @description 회원가입
 * @routes POST /auth/register
 * @request @body {email, password}
 */
router.post('/register', validator, async (req, res, next)=>{
    const  {email, password} =req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // todo: DB
        // todo: email 겹치지 않게
        users.push({id:5, email, password: hashPassword});
        console.log(email, password);
        console.log(users);
        res.status(201).json({
            success:true,
            message:'가입 성공'
        });
    }catch(e){
        next(e);
    }
});

/**
 * @description 로그인
 * @routes POST /auth/login
 * @request @body {email, password}
 */
router.post('/login', validator, async (req, res, next)=>{
    const {email, password} =req.body;
    try{
        //todo: DB select
        const user = users.find((user,index,arr)=>user.email == email);
        // const user = users.find(user=>{
        //     return user.email ==email;
        // });
        // const user = users.find(function(user){return user.email ==email;});
        //400 잘못입력, 403 접근금지
        if(!user) res.status(403).json({success: false, mesage: '없는 이메일'});
        else{
            user.password;
            if(await bcrypt.compare(password, user.password)){
                req.session.isLogin = true;
                req.session.email = email;
                req.session.userId = user.id;
                res.status(201).json({success: false, mesage: '로그인 성공'});
            } else{
                res.status(403).json({success: false, mesage: '비밀번호 틀림'});
            }
        }
    }
        catch(e){
        next(e);
    }
})

module.exports = router;