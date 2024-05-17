<script setup>

import ReTable from "../../components/ReTable.vue";
import {reactive, ref} from "vue";
import {deletePod, getPodsList} from "../../api/pods.js";
import {ElMessage} from "element-plus";
import CodeMirror from "../../components/CodeMirror.vue";
import {obj2Yaml} from "../../utils/tools.js";
const codeConfig = reactive({
  show: false,
  data: ""
})
const params = reactive({
  list: [],
  cluster: "",
  namespace: "",
  columns: [{
    prop: "metadata.name",
    label: "Pod名称",
  },
    {
      prop: "spec.nodeName",
      label: "节点名称",
    },
    {
      prop: "status.phase",
      label: "状态",
      formatter: (data) => {
        if (data.metadata.deletionTimestamp !== undefined) {
          return "Terminating"
        }else{
          return "Running"
        }
      }
    },
    {
      prop: "status",
      label: "就绪",
      formatter: (data) => {
        if (data.status.containerStatuses === undefined) {
          return "0/1"
        }
        let total = 0
        let ready = 0
        data.status.containerStatuses.forEach((item) => {
          total += 1
          if (item.ready) {
            ready += 1
          }
        })
        return `${ready}/${total}`
      }
    },
    {
      prop: "status.podIP",
      label: "Pod IP",
    },
    {
      prop: "status.restartCount",
      label: "重启次数",
      formatter: (data) => {
        return data.status.containerStatuses[0].restartCount
      }
    }
  ]
})
const pagination = reactive({
  total: 1,
  size: 10,
  loading: false,
  page: 1
})
const getPods = (param) => {
  params.cluster = param.cluster
  params.namespace = param.namespace
  pagination.page = param.page
  getPodsList(param).then(response => {
    const {code, data} = response
    if (code !== 200) {
      return
    }
    pagination.total = data.total
    params.list = data.pods
  }).catch(() => {
    params.list = []
  })
}
const flushPodList = () => {
  getPodsList({
    page: pagination.page, size: pagination.size, cluster: params.cluster, namespace: params.namespace
  }).then(response => {
    const {code, data} = response
    if (code !== 200) {
      return
    }
    pagination.total = data.total
    params.list = data.pods
  }).catch(() => {
    params.list = []
  })
}
const clearData = () => {
  params.list = []
}
const deleteConfirm = (row) => {
  deletePod({zone: params.cluster, namespace: params.namespace, name: row.metadata.name}).then(response => {
    const {message} = response
    ElMessage.success(message)
  }).finally(() => {
    flushPodList()
  })
}
const detail = (row) => {
  const item = JSON.parse(JSON.stringify(row))
  const metadata = item.metadata
  delete metadata.managedFields
  const pod = {
    apiVersion: "v1",
    kind: "Pod",
    metadata: metadata,
    spec: row.spec,
  }
  codeConfig.data = obj2Yaml(pod)
  codeConfig.show = true
}
</script>

<template>
  <el-dialog title="详情" v-model="codeConfig.show" width="50%" center>
    <CodeMirror :code="codeConfig.data"></CodeMirror>
    <template #footer>
      <el-button type="primary" plain @click="codeConfig.show=false">关闭</el-button>
    </template>
  </el-dialog>
  <ReTable :pagination="pagination" :columns="params.columns" :data="params.list" @list="getPods"
           @clearData="clearData">
    <template #table-ext>
      <el-table-column  align="center" fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" @click="detail(scope.row)">详情</el-button>
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="是否删除"
              @confirm="deleteConfirm(scope.row)">
            <template #reference>
              <el-button :disabled="scope.row.metadata.deletionTimestamp !==undefined"  link type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </template>
  </ReTable>
</template>

<style scoped lang="scss">

</style>