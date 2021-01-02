const mysql = require("mysql2/promise");
require("dotenv").config();
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "80968096",
    database: 'board',
    waitForConnections: true,
    connectionLimit: 5,
});
// (async ()=>{
//     const conn = await pool.getConnection();        
//         await conn.execute(`
//         CREATE TABLE post_like(
//             id int(11) NOT NULL AUTO_INCREMENT,
//             post_id int(11) NOT NULL,
//             user_id int(11) NOT NULL,
//             createdAt timestamp NOT NULL DEFAULT current_timestamp(),
//             updatedAt timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
//             PRIMARY KEY (id),
//             CONSTRAINT like_post_id_fk FOREIGN KEY (post_id) REFERENCES post (id),
//             CONSTRAINT like_user_id_fk FOREIGN KEY (user_id) REFERENCES user (id)
//         )`);
//     await conn.release();
//     console.log('success');
// })();

module.exports = {
    getConn: () => pool.getConnection()
};

// 테이블 호스트언어로 만들기
// (async ()=>{
//     const conn = await pool.getConnection();
//     const sql = "CREATE DATABASE board"
//     const result = await conn.execute(sql);
// })()