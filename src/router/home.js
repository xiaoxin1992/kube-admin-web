import {users} from "./users.js";
import {cluster} from "./cluster.js";
import podList from "./pods.js";
import deployment from "./deployment.js";

const home = {
    path: '/',
    name: 'home',
    component: () => import("../views/home.vue"),
    redirect: '/index',
    meta: {
        title: "首页"
    },
    children: [
        {
            path: '/index',
            name: 'index',
            meta: {
                title: "大盘"
            },
            component: () => import("../views/index.vue"),
        },
        users,
        cluster,
        podList,
        deployment
    ]
}

export default home