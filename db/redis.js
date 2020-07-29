const {REDIS_CONFIG} = require("../config/db");
const redis = require("redis");
const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

client.on("error", function(error) {
    console.error(error);
});
function redisSet(key,value){
    if (typeof value === "object"){
        value = JSON.stringify(value);
    }
    client.set(key, value, redis.print);
}
function redisGet(key){
    return new Promise((resolve, reject) => {
        client.get(key,(err,value)=>{
            if(err){
                reject(err);
            }
            try {
                resolve(JSON.parse(value));
            }catch (e) {
                resolve(value);
            }
        });
    })
}

module.exports = {
    redisSet,
    redisGet
}