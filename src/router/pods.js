const podList = {
    path: '/pods/list',
    name: 'podList',
    meta: {
        title: "Pod列表"
    },
    component: () => import("../views/pods/list.vue"),
}

export default podList