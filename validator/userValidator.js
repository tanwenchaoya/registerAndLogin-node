const userSchema = {
    //传递的对象时json类型
    type: "object",
    //传进来的json数据有哪些类型及他们的类型
    properties: {
        username: {
            type: "string",
            pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
            maxLength: 255,
            minLength: 3
        },
        password: {
            type: "string",
            pattern: '^[A-Za-z0-9]{6,20}$',
            maxLength: 20,
            minLength: 6
        },
        repPwd: {
            type: "string",
            pattern: '^[A-Za-z0-9]{6,20}$',
            maxLength: 20,
            minLength: 6
        },
        gender: {
            type: "string",
            pattern: '[1,2,3]',
            maxLength: 1,
            minLength: 1
        }
    },
    //代表必须要有用户名和密码
    required: ["username", "password"]
}
module.exports = userSchema;