/*
*  axios二次封装
*/

import axios from "axios";
import config from "../config/index.js";
import {ElMessage} from "element-plus";
import router from "../router";
import storage from "./storage.js";

const TOKEN_INVALID = "认证失败，请重新登陆"
const NETWORK_ERROR = "网络请求异常，请稍后重试"

// axios 实例对象全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: config.timeout
})

// 请求拦截
service.interceptors.request.use((req) => {
    const headers = req.headers
    if (!headers.Authorization) {
        let us = storage.getItem("users")
        if (us !== undefined) {
            headers.Authorization = us.token
        }
    }
    return req;
})

// 响应拦截

service.interceptors.response.use(res => {
    const {code, message} = res.data
    if (res.status === 401 || code === 401) {
        ElMessage.error(TOKEN_INVALID)
        router.push({"name": "login"})
        return Promise.reject(TOKEN_INVALID)
    } else if (res.status !== 200 || code === 200) {
        return res.data
    } else {
        ElMessage.error(message || NETWORK_ERROR)
        return Promise.reject(message || NETWORK_ERROR)
    }
}, error => {
    // error.response
    if (error.response === undefined) {
        ElMessage.error(NETWORK_ERROR)
    } else if (error.response.status === 401 && error.response.config.url !== "/login") {
        ElMessage.error(TOKEN_INVALID)
        router.push({"name": "login"})
    } else {
        ElMessage.error(error.response.data.message)
    }
    return Promise.reject(error);
})

/*
*  请求核心函数
*  @param {*} options 请求配置
*
*/
function request(options) {
    options.method = options.method || "GET"  // 默认是GET请求
    if (options.method.toUpperCase() === "GET") {
        options.params = options.data
    }
    service.defaults = {
        baseURL: config.baseApi,
        timeout: config.timeout

    }
    return service(options)
}

["get", "post", "put", "delete", "patch"].forEach((item) => {
    request[item] = (url, data, options) => {
        return request({url, data, methods: item, ...options})
    }
})

export default request
