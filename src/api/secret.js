import request from "../utils/request.js";


export const getSecrets = async (param) => {
    const url = `/secret/list?size=${param.size}&page=${param.page}&zone=${param.cluster}&namespace=${param.namespace}`
    return await request({
        method: "get",
        url: url,
    })
}