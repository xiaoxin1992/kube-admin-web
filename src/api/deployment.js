import request from "../utils/request.js";


export const getDeploymentList = async (param) => {
    const url = `/deployment/list?size=${param.size}&page=${param.page}&zone=${param.cluster}&namespace=${param.namespace}`
    return await request({
        method: "get",
        url: url,
    })
}

export const getDeploymentDetail = async (param) => {
    const url = `/deployment/detail?zone=${param.cluster}&namespace=${param.namespace}&name=${param.name}`
    return await request({
        method: "get",
        url: url,
    })
}

export const deleteDeployment = async (data) => {
    return await request({
        method: "post",
        url: "/deployment/delete",
        data
    })
}

export const createDeployment = async (data) => {
    return await request({
        method: "post",
        url: "/deployment/create",
        data
    })
}

export const updateDeployment = async (data) => {
    return await request({
        method: "post",
        url: "/deployment/update",
        data
    })
}
