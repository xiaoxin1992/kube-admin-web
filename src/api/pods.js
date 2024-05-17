import request from "../utils/request.js";


const getPodsList = async (param) => {
    const url = `/pods/list?size=${param.size}&page=${param.page}&zone=${param.cluster}&namespace=${param.namespace}`
    return await request({
        method: "get",
        url: url,
    })
}

const deletePod = async (data) => {
    return await request({
        method: "post",
        url: "/pods/delete",
        data
    })
}


export {getPodsList, deletePod}