import request from "../utils/request.js";

const createUser = async (data) => {
    await request({
        method: "post",
        url: "/user/create",
        data
    })
}




export {createUser}