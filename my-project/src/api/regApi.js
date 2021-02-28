import axios from '@/utils/axios'

let getMailCode = async (email)=>{
    if(!email){
        throw new Error('没有传入 email 无法发送邮件')
    } else {
        return await axios.post('/public/sendMail',{
            to:email
        })
    }
}

let postReg = async(obj)=>{
    return await axios.post('/public/reg',obj)
}

export default {
    getMailCode,
    postReg
}