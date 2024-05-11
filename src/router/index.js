import {createRouter, createWebHashHistory} from "vue-router";
import login from "./login.js";
import home from "./home.js";
import storage from "../utils/storage.js";
import {userStore} from "../store/index.js";

const routes = [
    login,
    home
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    let userinfo = storage.getItem("users")
    if (to.name !== "login") {
        if (userinfo === undefined) {
            next({"name": "login"})
        } else {
            userStore().setUserName(userinfo.username)
        }
    }

    next()
})

export default router;