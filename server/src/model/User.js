const mongoose = require('../lib/mongoose')

let Schema = mongoose.Schema;
let userSchema = new Schema({
    username:String,
    password:String,
    email:String,
    gender:Number,
    valid:Number,

})

let usersModel = mongoose.model('users',userSchema)

module.exports = usersModel