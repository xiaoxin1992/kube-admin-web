const home = {
    path: '/',
    name: 'home',
    component: () => import("../views/home.vue"),
    redirect: '/index',
    children: [
        {
            path: '/index',
            name: 'index',
            component: () => import("../views/index.vue"),
        }
    ]
}

export default home