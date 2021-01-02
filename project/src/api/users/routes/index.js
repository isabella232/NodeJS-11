const userController = require('../controllers');
const {getUserValidator,modifyUserValidator, modifyUserPwValidator} = require('../../middleware/user.validator');
const authentication = require('../../middleware/authentication');
const userRouter = require('express').Router();

// todo: 인증 미들웨어 등록
userRouter.use(authentication.verify);

/**
 * @description 프로필 조회
 * @routes GET / users/:id
 */
userRouter.get('/',userController.getUser );

/**
 * @description 프로필 수정 (이름 수정)
 * @routes PATCH / users/:id
 * @request @body {name}
 */
userRouter.patch('/',userController.modifyUser );

/**
 * @description 프로필 비밀번호 수정
 * @routes PATCH / users/password/:id
 */
userRouter.get('/password/:id',userController.modifyUserPw);


module.exports = userRouter;
