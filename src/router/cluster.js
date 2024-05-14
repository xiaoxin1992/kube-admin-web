export const cluster =       {
    path: 'cluster',
    name: 'cluster',
    meta: {
        title: "集群资源"
    },
    redirect: "list",
    children: [
        {
            path: 'list',
            name: 'clusterList',
            meta: {
                title: "集群列表"
            },
            component: () => import("../views/cluster/list.vue"),
        },
        {
            path: 'node',
            name: 'node',
            meta: {
                title: "节点列表"
            },
            component: () => import("../views/cluster/node.vue"),
        },
        {
            path: 'namespace',
            name: 'namespace',
            meta: {
                title: "命名空间"
            },
            component: () => import("../views/cluster/namespace.vue"),
        }
    ]

}