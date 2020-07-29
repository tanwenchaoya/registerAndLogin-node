// const {exc,escape} = require('../db/mysql');
const User = require('../db/model/user');
async function getUser(username,password) {
    // username = escape(username);
    // password = escape(password);
    // if (password){
    //     let sql = `select * from user where username = ${username} and password = ${password}`;
    //     let result = exc(sql);
    //     return result;
    // }else {
    //     let sql = `select * from user where username = '${username}'`;
    //     let result = exc(sql);
    //     return result;
    // }
    if(password){
        let results = await User.findAll({
            where:{
                username:username,
                password:password
            }
        });
        return results;
    }else{
        let results = await User.findAll({
            where:{
                username:username
            }
        });
        return results;
    }
}

async function insertUser({username, password, gender}){
    /*let sql = `insert into user (username, password, gender) values('${username}','${password}','${gender}');`;
    let result = await exc(sql);
    return result;*/
    let results = await User.create({
        username:username,
        password:password,
        gender:gender
    });
    // console.log(results);
    return results['dataValues'];
}
module.exports = {
    getUser,
    insertUser
}