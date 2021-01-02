const router =require('express').Router();

router.get('/',(req,res)=>{
    res.json(users);
});
/**
 * @description 내정보 조회하기
 * @routes GET /users/:id
 */
router.get('/:id',(req,res)=>{
    if(req.session.isLogin){
        // 내 정보 로그인 할 수 있는 로직
    } else { 
        // 로그아웃시킴 (redirect)
    }
});

module.exports =router