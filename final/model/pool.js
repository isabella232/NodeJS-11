const database = require('mysql2/promise');
require('dotenv').config();

const pool = database.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:'cadi_final',
    waitForConnections:true,
    connectionLimit: 5,
});
// (async ()=>{
//     const conn = await pool.getConnection();
//     //create Database
//     await conn.execute('CREATE DATABASE CADI_FINAL');
//     //create table
//     conn.release();
// })();
module.exports={
    getConn: _=> pool.getConnection()
}