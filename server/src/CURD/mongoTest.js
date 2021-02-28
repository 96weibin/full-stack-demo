const usersModel = require('../model/User')


// 新增
let addUser = async(user)=>{
    let aUser = new usersModel(user)
    let res = await aUser.save()
    console.log(res)
}
// addUser(user1)


//删除
let deleteOneUser = async(user)=>{
    let res = await usersModel.deleteOne({
        age:18
    })
    console.log(res)
}
// deleteOneUser()
//修改
let mudateOneUser = async()=>{
    let res = await usersModel.updateOne({
        name:'weibin'
    },{
      age:18
    })
    console.log(res)
}
// mudateOneUser()
//查找
let findUser = async(user)=>{
    let res = await usersModel.find()
    console.log(res)
}
// findUser()