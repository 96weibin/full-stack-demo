const koa = require('koa')
const dbConfig = require('../conf/dbConfig')
const MongoClient = require('mongodb').MongoClient;


(async ()=>{
    let client = await MongoClient.connect(dbConfig.DB_URLL,{ useUnifiedTopology: true });
    let db = client.db('test')
    let data = await (await db.collection('users').find({username:'test'})).toArray()
    
    app.use(async ctx=>{
        ctx.body = data
    })
    // return await data
})()

// module.exports={
//     find
// }
let app = new koa()
app.listen(9999)
