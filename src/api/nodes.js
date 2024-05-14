import request from "../utils/request.js";

const getNodeList = async (param) => {
    const url = `/nodes/list?size=${param.size}&page=${param.page}&zone=${param.zone}`
    return await request({
        method: "get",
        url: url,
    })
}


export {getNodeList}