const { getValue, getHValue, setValue } = require('../lib/redis');

(async()=>{
    let res = await setValue('testObj2',{
        city:'jinan',
        job:"fe",
        title:'master'
    });
    console.log(res)
})()