const Ajv = require('ajv');
const ajv = new Ajv();
const userSchema = require('../validator/userValidator');
const {getUser,insertUser} = require('../service/userService')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResultModel');
const errorType = require("../config/error");
const generatePwd = require("../utils/crypto");
//用户输入正确性验证
function userValidate(data) {
    return ajv.validate(userSchema,data)
}
//判断用户存在
async function userExists(username){
    let users = await getUser(username);
    return users.length !== 0;
}
//进行注册
async function userRegister({username, password, gender}){
    //校验数据是否正确
    let valid = userValidate({username, password, gender});
    if (!valid){
        return new ErrorModel(errorType.userDataFail);
    }
    //判断用户是否存在
    let isExists = await userExists(username)
    if (!isExists){
        try {
            let res = await insertUser({username, password:generatePwd(password), gender});
            return new SuccessModel({msg:"注册成功",data:username});
        }catch (e) {
            console.log(e);
            return new ErrorModel(errorType.userRegisterFail);
        }
    }else {
        return new ErrorModel(errorType.userExistsFail);
    }
}
//登录验证
async function loginCheck({username,password}){
    let user = await getUser(username,generatePwd(password));
    if (user.length!== 0){
        return new SuccessModel({msg:"登录成功",data:user[0]})
    }else {
        return new ErrorModel(errorType.userLoginFail);
    }
}

module.exports ={
    userValidate,
    userExists,
    userRegister,
    loginCheck
}