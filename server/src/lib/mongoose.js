const mongoose = require('mongoose')
const dbConfig = require('../conf/dbConfig');


mongoose.connect(dbConfig.DB_URLL +'/test', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected',()=>{
    console.log('mongodb 链接成功')
})
mongoose.connection.on('error',(err)=>{
    console.log('mongodb 链接失败')
})
mongoose.connection.on('disconnected',()=>{
    console.log('mongodb 链接断开')
})

module.exports = mongoose

