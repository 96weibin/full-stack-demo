import axios from "@/utils/axios";

let getCaptcha = async ()=>{
    return await axios.get("/public/captcha",{
        params:{
            sid:localStorage.sid
        }
    })
}

let postLogin = async(obj)=>{
    let {username,password,captcha}=obj;
    if(!username || !password || !captcha) {
        return
    } else {
        return await axios.post('/public/login',{
            username,
            password,
            captcha,
            sid:localStorage.getItem('sid')
        })
    }
}
export default {
    getCaptcha,
    postLogin
} 