const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

const pool = mysql.createPool(dbConfig);

const getConn = () => pool.getConnection();
// const getConn = function(){
//     return pool.getConnection();
// }

module.exports = {
    getConn
}