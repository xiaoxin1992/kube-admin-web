import request from "../utils/request.js";

export const loginReq = (data)=>{
    return request({
        url: '/login',
        method: 'post',
        data
    })
}