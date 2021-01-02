const {
    getTodo,
    addTodo,
    DeleteTodo,
    UpdateTodo,
    isCompleted
} = require('../controllers/todo.controller');

const router = require('express').Router();

/**
 * @description 모든 조회
 * @route GET /todo
 */
router.get('/', getTodo);

/**
 * @description todo 생성
 * @route POST /todo
 * @request @body {title, date}
 */
router.post('/', addTodo);

/**
 * @description todo 삭제
 * @route DELETE /todo/:id
 */
router.delete('/:id', DeleteTodo);

/**
 * @description todo 수정
 * @route PATCH /todo/:id
 * @request @body {title, date}
 */
router.patch('/:id', UpdateTodo);

/**
 * @description todo 완료
 * @route PATCH /todo/completed/:id
 */
router.patch('/completed/:id', isCompleted);

module.exports = router;