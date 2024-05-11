import {defineStore} from "pinia"
import actions from "./actions.js";
import getters from "./getters.js";
import state from "./state.js";


export const userStore = defineStore("users", {
    actions,
    state,
    getters
})