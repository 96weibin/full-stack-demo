module.exports = async (ctx,next)=>{  //全局try
    try{
        await next()
    } catch(err){
        console.log(err)
    }
}