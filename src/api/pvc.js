import request from "../utils/request.js";

export const getPVCList = async (param) => {
    const url = `/pvc/list?size=${param.size}&page=${param.page}&zone=${param.zone}&namespace=${param.namespace}`
    return await request({
        method: "get",
        url: url,
    })
}
