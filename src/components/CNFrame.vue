<script setup>
import {onBeforeMount, reactive} from "vue";
import {getNSList} from "../api/namespace.js";
import {getClusterList} from "../api/cluster.js";

const selected = reactive({
  cluster: "",
  clusters: [],
  namespace: "",
  namespaces: []
})

const emit = defineEmits(["change"]);
const getNamespace = () => {
// 获取命名空间
  getNSList({size: 10000, page: 1, zone: selected.cluster}).then(response => {
    const {code, data} = response
    if (code === 200) {
      selected.namespaces = data.namespace
      selected.namespace = "default"
    }
  }).catch(() => {
    selected.namespace = ""
  }).finally(() => {
    changeNS()
  })
}
const changeNS = () => {
  emit("change", {cluster: selected.cluster, namespace: selected.namespace})
}
const getClusters = (() => {
  getClusterList({size: 10000, page: 1, query: ""}).then(response => {
    const {code, data} = response
    if (code === 200) {
      selected.clusters = data.clusters
    }
  }).catch(() => {
    selected.cluster = ""
  })
})
onBeforeMount(() => {
  getClusters()
})
</script>

<template>
  <el-select style="width: 220px; margin-right: 32px" v-model="selected.cluster" size="default" placeholder="请选择集群"
             @change="getNamespace()">
    <el-option v-for="item in selected.clusters" :label="item.zone" :value="item.zone"></el-option>
  </el-select>
  <el-select style="width: 220px" v-model="selected.namespace" size="default" placeholder="请选择命名空间"
             @change="changeNS">
    <el-option v-for="item in selected.namespaces" :label="item.name" :value="item.name"></el-option>
  </el-select>
</template>

<style scoped lang="scss">
</style>