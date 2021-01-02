const mysql = require('mysql');
const dbConfig = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'80968096',
    database: 'nodestudy',
    connectionLimit :10
};

const dbpool = mysql.createPool(dbConfig);

module.exports = dbpool;
