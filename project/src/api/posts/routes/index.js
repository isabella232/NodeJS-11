const authentication = require('../../middleware/authentication');
const {getList,getPost,addPost,modifyPost,removePost,likePost} = require('../controllers');
const postRouter = require('express').Router();

postRouter.get(authentication.verify)
/**
 * todo: 페이지네이션
 * @description 게시물 리스트 조회
 * @routes GET / posts
 */
postRouter.get('/',getList );

// /**
//  * todo: 페이지네이션
//  * @description 게시물 댓글 리스트 조회
//  * @routes GET / posts/:id/comments
//  */
// postRouter.get('/:id/comments' );

/**
 * @description 게시물 조회
 * @routes GET / posts/:id
 */
postRouter.get('/:id',getPost );

/**
 * @description 게시물 등록
 * @routes POST / posts
 * @request @body {content, images}
 */
postRouter.post('/',addPost);

/**
 * @description 게시물 수정
 * @routes PUT / posts/:id
 * @request @body {content, images}
 */
postRouter.put('/:id',modifyPost);

/**
 * @description 게시물 삭제
 * @routes DELTE / posts/:id
 */
postRouter.delete('/:id',removePost);

/**
 * @description 게시물 좋아요
 * @routes PATCH / posts/:id/like
 */
postRouter.patch('/:id/like',likePost);

module.exports = postRouter;