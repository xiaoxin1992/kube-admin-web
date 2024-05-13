export const users =       {
    path: 'user',
    name: 'user',
    meta: {
        title: "用户管理"
    },
    redirect: "list",
    component: () => import("../views/user/list.vue"),
    children: [
        {
            path: 'list',
            name: 'list',
            meta: {
                title: "用户列表"
            },
            component: () => import("../views/user/list.vue"),
        },
    ]

}