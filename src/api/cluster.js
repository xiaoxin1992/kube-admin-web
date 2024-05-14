import request from "../utils/request.js";

const getClusterList = async (param) => {
    const url = `/cluster/list?size=${param.size}&page=${param.page}&query=${param.query}`
    return await request({
        method: "get",
        url: url,
    })
}

const createCluster  = async (data) => {
    return await request({
        method: "post",
        url: "/cluster/create",
        data
    })
}

const updateCluster  = async (data) => {
    return await request({
        method: "post",
        url: "/cluster/update",
        data
    })
}
const delCluster  = async (data) => {
    return await request({
        method: "post",
        url: "/cluster/delete",
        data
    })
}

export {getClusterList, createCluster, delCluster, updateCluster}