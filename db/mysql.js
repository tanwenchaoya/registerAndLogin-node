// 1.导入mysql驱动
const mysql      = require('mysql');
// const MYSQL_CONFIG = require('../config/db');
// 2.创建连接对象
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'demo'
});
// 3.连接MySQL数据库
connection.connect();
// 4.操作MySQL数据库

const exc = (sql) =>{
    return new Promise((resolve, reject)=>{
        connection.query(sql, function (error, results) {
            if (error){
                reject(error);
            }else{
                resolve(results);
            }
        });
    });
};

module.exports = {
    exc,
    escape:mysql.escape
};
