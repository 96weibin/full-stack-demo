const redis = require('redis')
const {promisify} = require('util')
const option = require('../conf/redisConfig')


const client = redis.createClient(option); 
const getAsync = promisify(client.get).bind(client);
const getHAllasync = promisify(client.hgetall).bind(client);


/**
 * 获取字符串
 * @param {String} k 
 */
const getValue = (k)=>{
    return getAsync(k)
}
/**
 * 获取hash列表
 * @param {String} k 
 */
const getHValue = (k)=>{
    return getHAllasync(k)
}
/**
 * 设置 k-v 
 * @param {Sting} k key
 * @param {*} v value
 * @param {*} t 超时时间
 */
const setValue = (k,v,t)=>{
    if(typeof k !== 'string' || v === null || v === ''){
        console.log(v)
        return "arguments error please send key:sting,value"
    }
    if(typeof v === 'string'){
        if(t){
          client.set(k,v,'EX',t)
        } else {
            client.set(k,v)
        }
    } else if(typeof v === "object"){
        Object.keys(v).forEach((item)=>{
            client.hset(k, item, v[item], redis.print)
        })
    }
}
module.exports = {
    client,
    getValue,
    getHValue,
    setValue
}
