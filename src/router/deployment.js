const podList = {
    path: '/deployment',
    name: 'deploymentList',
    meta: {
        title: "deployment管理"
    },
    children: [
        {
            path: '/deployment/list',
            name: 'deploymentList',
            meta: {
                title: "deployment列表"
            },
            component: () => import("../views/deployment/list.vue"),
        },
        {
            path: '/deployment/create',
            name: 'deploymentCreate',
            meta: {
                title: "deployment创建"
            },
            component: () => import("../views/deployment/create.vue"),
        },
        {
            path: '/deployment/edit',
            name: 'deploymentEdit',
            meta: {
                title: "deployment编辑"
            },
            component: () => import("../views/deployment/edit.vue"),
        }
    ]
}

export default podList