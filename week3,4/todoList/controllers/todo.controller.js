const getConn = require("../database/pool").getConn;
//const {getConn} = require('../database/pool);

module.exports = {
    getTodo: async (req, res, next) => {
        let conn = null;
        try {
            conn = await getConn();
            const [rows] = await conn.query("select * from todo");
            res.status(200).json(rows);
            conn.release();
        } catch (getTodoErr) {
            if (conn) conn.release();
            next(getTodoErr);
        }
    },
    addTodo: async (req, res, next) => {
        let conn = null;
        try {
            const {
                title,
                create_at
            } = req.body;
            conn = await getConn();
            console.log(title, create_at);
            const [row] = await conn.execute("insert into todo (title, create_at) values(?, ?)", [title, create_at]);
            res.status(201).json({
                success: true,
                message: "성공",
                row,
            });
            conn.release();
        } catch (addTodoErr) {
            if (conn) conn.release();
            next(addTodoErr);
        }
    },
    UpdateTodo: async (req, res, next) => {
        let conn = null;
        try {
            const {
                id
            } = req.params;
            console.log(id);
            const {
                title,
                create_at
            } = req.body;
            console.log(title, create_at);
            conn = await getConn();
            const [row] = await conn.execute("update todo set title=?, create_at=? where id = ?", [title, create_at, id]);
            console.log(row);
            res.json({
                success: true,
                message: "성공",
                row,
            })
            conn.release();
        } catch (UpdateTodoErr) {
            if (conn) conn.release();
            next(DeleteTodoErr);
        }
    },
    DeleteTodo: async (req, res, next) => {
        let conn = null;
        try {
            const {
                id
            } = req.params;
            console.log(id);
            conn = await getConn();
            const [row] = await conn.execute("delete from todo where id=?", [id]);
            res.json({
                success: true,
                message: "성공",
                row,
            });
            conn.release();
        } catch (DeleteTodoErr) {
            if (conn) conn.release();
            next(DeleteTodoErr);
        }
    },
    isCompleted: async (req, res, next) => {
        let conn = null;
        try {
            const {
                id
            } = req.params;
            console.log(id);
            conn = await getConn();
            const [row] = await conn.execute("select * from todo where id = ?", [id]);
            const [rows] = await conn.execute("update todo set completed = ? where id = ?", [!row[0].completed, id]);
            res.status(200).json({
                success: true,
                message: "성공",
                rows,
            });
            conn.release();
        } catch (isCompletedErr) {
            if (conn) conn.release();
            next(isCompletedErr);
        }
    },
};