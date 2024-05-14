export const users = {
    path: 'user/list',
    name: 'user',
    meta: {
        title: "用户管理"
    },
    redirect: {name: "userList"},
    children: [
        {
            path: 'list',
            name: 'userList',
            meta: {
                title: "用户列表"
            },
            component: () => import("../views/user/list.vue"),
        },
    ]

}