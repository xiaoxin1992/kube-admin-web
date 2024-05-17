import request from "../utils/request.js";

export const getConfigMapList = async (param) => {
    const url = `/configmap/list?size=${param.size}&page=${param.page}&zone=${param.zone}&namespace=${param.namespace}`
    return await request({
        method: "get",
        url: url,
    })
}
