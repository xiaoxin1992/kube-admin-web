<script setup>
import {Search} from "@element-plus/icons-vue";
import {onBeforeMount, reactive} from "vue";
import {getClusterList} from "../api/cluster.js";
import {getNSList} from "../api/namespace.js";

const props = defineProps({
  data: {type: Array, required: true},
  columns: {type: Array, required: true},
  pagination: {
    type: Object,
    required: true
  }
})
const pagination = reactive({
  page: 1,
  size: props.pagination.size,
})
const emit = defineEmits(["list", "clearData"])
const getList = () => {
  emit("list", {...pagination, cluster: tableReq.cluster, namespace: tableReq.namespace})
}
const tableReq = reactive({
  clusters: [],
  cluster: "",
  namespaces: [],
  namespace: "",
})
const getNamespace = () => {
// 获取命名空间
  getNSList({size: 10000, page: 1, zone: tableReq.cluster}).then(response => {
    const {code, data} = response
    if (code === 200) {
      tableReq.namespaces = data.namespace
      tableReq.namespace = "default"
      getList()
    }
  }).catch(()=>{
    emit("clearData")
  })
}
const getClusters = (() => {
  getClusterList({size: 10000, page: 1, query: ""}).then(response => {
    const {code, data} = response
    if (code === 200) {
      tableReq.clusters = data.clusters
    }
  })
})
onBeforeMount(() => {
  getClusters()
})
</script>

<template>
  <el-form :inline="true" :size="'default'" @submit.native.prevent>
    <el-form-item style="width: 15%">
      <el-select v-model="tableReq.cluster" size="default" placeholder="请选择集群" @change="getNamespace()">
        <el-option v-for="item in tableReq.clusters" :label="item.zone" :value="item.zone"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="width: 15%">
      <el-select v-model="tableReq.namespace" size="default" placeholder="请选择命名空间" @change="getList">
        <el-option v-for="item in tableReq.namespaces" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <slot name="ext"></slot>
  </el-form>
  <el-table v-loading="props.pagination.loading" :data="props.data" :size="'default'">
    <el-table-column fixed align="center" v-for="column in props.columns" :key="column.prop" :prop="column.prop"
                     :label="column.label" :formatter="column.formatter" :width="column.width"></el-table-column>
    <slot name="table-ext"></slot>
  </el-table>
  <div class="pagination">
    <el-pagination @change="getList()" v-model:current-page="pagination.page" background layout="prev, pager, next"
                   prev-text="上一页" next-text="下一页" :page-size="props.pagination.size"
                   :total="props.pagination.total"/>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>