const router = require('express').Router();
const {users} = require('./database.js');

/**
 * @description 유저들의 조합
 * @route GET /
 */
router.get('/',async(req,res,next)=>{
    const members = users;
    res.status(200).json(members); //우린 백엔드 개발자니까;
});

/**
 * @description 유저 가입
 * @route POST /
 * @request @Body {name, password, nickname}
 */
router.post('/', async(req,res,next)=>{
    const {name, password, nickname} = req.body;
    //const lastId = users[users.length-1].id; 
    //const userId = Number(lastId) + 1;
    //const user ={id:userId.toString()}
    const lastId = users.length;
    const userId = lastId + 1;
    const user = {
            id:userId.toString(),
            name,
            password,
            nickname
        };
    users.push(user);
    res.status(201).json({success: true, message: '가입 성공'});
});

module.exports = router;

