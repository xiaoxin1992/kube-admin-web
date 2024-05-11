/*
*
* Storage 二次封装
*
*/

import config from "../config/index.js";

export default {
    setItem(key, val) {
        let storage = this.getStorage()
        storage[key] = val
        window.localStorage.setItem(config.namespace, JSON.stringify(storage))
    },
    getItem(key) {
        return this.getStorage()[key]
    },
    getStorage() {
        return JSON.parse(window.localStorage.getItem(config.namespace) || "{}")
    },
    deleteItem(key) {
        let storage = this.getStorage()
        delete storage[key]
        window.localStorage.setItem(config.namespace, JSON.stringify(storage))
    },
    deleteAll() {
        window.localStorage.clear()
    }
}