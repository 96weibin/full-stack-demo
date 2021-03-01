const axios = require('axios');
const errorHandler = require('./errorHandler')

const instance = axios.create({
  baseURL: 'http://106.13.116.236:8888',
  timeout: 10000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  errorHandler(error)
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.status === 200){
      return Promise.resolve(response.data)
  } else {
      return Promise.reject(response)
  }
}, function (error) {
  // 对响应错误做点什么
  errorHandler(error)
  return Promise.reject(error);
});

export default instance