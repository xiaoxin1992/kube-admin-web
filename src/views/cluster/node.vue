<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import {getClusterList} from "../../api/cluster.js";
import KubeTable from "../../components/KubeTable.vue";
import {getNodeList} from "../../api/nodes.js";

const tableConfig = reactive({
  search: false
})
const columns = ref([
  {
    prop: "name",
    label: "名称",
  },
  {
    prop: "address",
    label: "地址",
  },
  {
    prop: "hostName",
    label: "主机名",
  },
  {
    prop: "hostName",
    label: "主机名",
  },
  {
    prop: "status",
    label: "状态",
    formatter: (col) => {
      if (col.status) {
        return "Ready"
      } else {
        return "NoReady"
      }
    }
  },
  {
    prop: "create_time",
    label: "创建时间",
  },
])
const nsList = reactive({
  items: []
})

const pagination = reactive({
  total: 1,
  size: 10,
  loading: false,
  placeholder: "请输入ns名称"
})

const reqNode = reactive({
  page: pagination.size,
  size: pagination.size,
})

let tableReq = reactive({
  form: {
    zone: "",
    zones: [],
    host: "",
    token: "",
    remark: ""
  },
  addNS: {
    name: ""
  }
})

const getClusters = (() => {
  getClusterList({size: 10000, page: 1, query: ""}).then(response => {
    const {code, data} = response
    if (code === 200) {
      tableReq.form.zones = data.clusters
    }
  })
})

const getList = (param) => {
  reqNode.page = param.page
  reqNode.size = param.size
  getNode()
}
const getNode = () => {
  getNodeList({page: reqNode.page, size: reqNode.size, zone: tableReq.form.zone}).then(response => {
    const {total, nodes} = response.data
    pagination.total = total
    nsList.items = nodes
  }).catch(() => {
    nsList.items = []
  })
}

onBeforeMount(() => {
  getClusters()
})
</script>

<template>
  <KubeTable :columns="columns" :data="nsList.items" :pagination="pagination" :config="tableConfig" @list="getList">
    <template #ext>
      <el-form-item style="width: 15%">
        <el-select v-model="tableReq.form.zone" size="default" placeholder="请选择集群" @change="getNode">
          <el-option v-for="item in tableReq.form.zones" :label="item.zone" :value="item.zone"></el-option>
        </el-select>
      </el-form-item>
    </template>
  </KubeTable>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.el-form-item {
  margin-right: 0;
}
</style>