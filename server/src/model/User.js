const mongoose = require('../lib/mongoose')

let Schema = mongoose.Schema;
let userSchema = new Schema({
    name:String,
    age:Number,
    sex:Number,
    msg:String
})

let usersModel = mongoose.model('users',userSchema)

module.exports = usersModel