import request from "../utils/request.js";

const createUser = async (data) => {
    return await request({
        method: "post",
        url: "/user/create",
        data
    })
}

const getUserList = async (param) => {
    const url = `/user/list?size=${param.size}&page=${param.page}&query=${param.query}`
    return await request({
        method: "get",
        url: url,
    })
}

const changeUserPassword = async (data) => {
    return await request({
        method: "post",
        url: "/user/reset_password",
        data
    })
}

const dropUser = async (data) => {
    return await request({
        method: "post",
        url: "/user/delete",
        data
    })
}

export {createUser, getUserList, changeUserPassword, dropUser}