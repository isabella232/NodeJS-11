const { images } = require('../database/images.db');
const { users } = require('../database/user.db');
const router = require('express').Router();

//관리자가 모두 유저들을 조회
router.get('/users', async (req,res)=>{
    res.status(200).json(users);
});

//관리자가 서버에 있는 이미지들을 조회
router.get('/images', async (req,res)=>{
    res.status(200).json(images);
});

module.exports = router;