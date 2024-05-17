import {defineStore} from "pinia"
import actions from "./actions.js";
import getters from "./getters.js";
import state from "./state.js";


export const userStore = defineStore("users", {
    actions,
    state,
    getters
})



export const useItem = defineStore('item', {
    state: () => {
        return {
            cluster: "",
            namespace: "",
            item: {
                metadata: {
                    name: "",
                    labels: {},
                    annotations: {}
                },
                spec: {
                    strategy: {
                        type: "RollingUpdate",
                        rollingUpdate: {
                            maxSurge: "25%",
                            maxUnavailable: "25%"
                        }
                    },
                    selector: {
                        matchLabels: {},
                    },
                    replicas: 1,
                    template: {
                        metadata: {
                            labels: {},
                            annotations: {}
                        },
                        spec: {
                            //存储配置:
                            volumes: [],
                            nodeSelector: {},
                            hostNetwork: false,
                            imagePullSecrets: [],
                            dnsPolicy: "ClusterFirst"
                        }
                    }
                }
            },
        }
    },
    getters: {},
})