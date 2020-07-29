const {
    USER_LOGIN,
    USER_REGISTER,
    USER_INFO
} = require('./routerConst');
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResultModel');
// const generatePwd = require("../utils/crypto")
const {userRegister,loginCheck} = require("../controller/userController")
const {redisSet,redisGet} = require("../db/redis")
const userRouterHandle = async (req, res)=>{
    if(req.method === 'post' && req.path === USER_LOGIN){
        // 处理登录
        let result = await loginCheck(req.body);
        /*if (result.code === 200){
            // httpOnly不让客户端修改
            //可以通过expires来设置过期时间
            //不应该保存明文
            //为了安全的考虑，我们将用户信息保存在服务端
            res.setHeader("Set-Cookie",`username=${generatePwd(req.body.username)}; path=/;httpOnly;expires = ${setCookieExpries()}`)
        }*/
        if (result.code === 200){
            req.session.username = result.data.username;
            req.session.password = result.data.password;
            req.session.gender = result.data.gender;
            redisSet(req.userId, req.session);
        }
        return result;
    }else if(req.method === 'post' && req.path === USER_REGISTER){
        return userRegister(req.body);

    }else if(req.method === 'get' && req.path === USER_INFO){
        // 处理获取用户信息

        return new SuccessModel({msg:"欢迎你",data:req.session.username})
    }
};

module.exports = userRouterHandle;