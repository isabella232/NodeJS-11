const {verify} = require('jsonwebtoken');
require('dotenv').config();
const authentication={
    verify: (req,res,next)=>{
        const bearerToken = req.headers.authorization
        if(!bearerToken) res.status(403).json({success: false, message: '로그인 필요'});
        else {
            const auth = bearerToken.split(' ');
            if(auth[0] ==='Bearer' || auth[0] === 'Token'){
                req.user = verify(auth[1], process.env.JWT_SECRET);
                next();
            } else res.status(401).json({success: false, message: '인증 실패'});
        }
    }
};

module.exports = authentication;