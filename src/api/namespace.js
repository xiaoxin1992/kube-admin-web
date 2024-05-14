import request from "../utils/request.js";

const getNSList = async (param) => {
    const url = `/namespace/list?size=${param.size}&page=${param.page}&zone=${param.zone}`
    return await request({
        method: "get",
        url: url,
    })
}

const createNS  = async (data) => {
    return await request({
        method: "post",
        url: "/namespace/create",
        data
    })
}

const delNS  = async (data) => {
    return await request({
        method: "post",
        url: "/namespace/delete",
        data
    })
}

export {getNSList, createNS, delNS}