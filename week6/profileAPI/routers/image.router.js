const { images } = require('../database/images.db');
const { getUserByEmail } = require('../database/user.db');
const {upload} = require('../utils/multer.util');
const router = require('express').Router();

/**
 * @description 이미지 등록
 * @route POST /images
 * @request @body {email}
 */
router.post('/',upload.single('img'), async(req,res)=>{
    const {email} = req.body;
    // 이미지 데이터베이스에 추가
    const id = images[images.length-1].id+1 //AI(autoincrement)
    const path =req.file.destination + '/' + req.file.filename;
    
    // 어떠한 인증 체계를 통해서 유지를 알 수 있는 데이터를 받았다고 가정(req.body.email)
    const userId = getUserByEmail(email).id;
    images.push({id,path, userId});
    res.status(201).json({success:true, message:'업로드성공', images});
});

 module.exports = router;