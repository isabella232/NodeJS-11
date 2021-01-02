/**
 * 디비 드라이버 호출
 * 디비 연동 설정
 * 디비 연동 (커넥션 객체 생성)
 * 커넥션 객체를 통해서 sql 던짐
 */
const mysql = require('mysql2/promise');



async function main() {
    try {
        const conn = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "비밀번호",
            database: "cadi"
        });

        const [row] = await conn.query("select * from todo"); //select
        console.log(row);
        // await conn.execute(); //update, delete, insert
    } catch (err) {
        console.error(err.message);
    }
}

main();