const {verify} = require("../middlewares/auth.middleware");
const {profileUpload} = require("../middlewares/multer.middleware");
const { getConn } = require("../model/pool");
const router = require('express').Router();


router.use(verify);

router.get('/',async (req,res,next)=>{
    const conn = await getConn();
    const [rows] = conn.query(`select * from user_image WHERE user_id=?`,req.user.id);
    res.status(200).json({success:true, paths:rows.map((image)=>`localhost:9000/${image.path}`)});
});

router.post('/',profileUpload.single('profile_images'),(req,res,next)=>{
    (async (req,res,next) =>{
        let conn;
        try{
            conn =await getConn();
            await conn.execute(`insert into user_image(path,user_id) values(?,?)`,[
                req.profile,
                req.user.id]);
        }catch(e){
            next(e);
        }finally{
            if(conn) conn.release();
            res.status(201).json({success: true, message: '업로드 성공'});
        }
    })();
}),

router.delete('/',(req,res,next)=>{

});
module.exports = router;