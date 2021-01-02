const mysql = require('mysql2/promise');

// (익명함수)()
// (async function () {
//     const pool = mysql.createPool({
//         host: 'localhost',
//         user: 'root',
//         password: '80968096',
//         database: 'cadi',
//         waitForConnections: true,
//         connectionLimit: 3
//     });

//     const conn = await pool.getConnection();
//     const [
//         [row]
//     ] = await conn.query("select * from todo");
//     console.log(row.title);
//     conn.release();
// })();

(async function () {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '80968096',
        database: 'cadi',
        waitForConnections: true,
        connectionLimit: 3
    });

    const conn1 = await pool.getConnection();
    console.log(1);
    const conn2 = await pool.getConnection();
    console.log(2);
    const conn3 = await pool.getConnection();
    console.log(3);
    const conn4 = await pool.getConnection();
    console.log(4);
    //connection의 제한이 3개이기에 4번은 기다리는 중
})();