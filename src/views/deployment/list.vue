<script setup>

import ReTable from "../../components/ReTable.vue";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import CodeMirror from "../../components/CodeMirror.vue";
import {obj2Yaml} from "../../utils/tools.js";
import {deleteDeployment, getDeploymentList} from "../../api/deployment.js";
import {Minus, Plus} from "@element-plus/icons-vue";
const codeConfig = reactive({
  show: false,
  data: ""
})
const params = reactive({
  list: [],
  cluster: "",
  namespace: "",
  isUpdate: "",
  columns: [{
    prop: "metadata.name",
    label: "名称",
  },
    {
      prop: "metadata.creationTimestamp",
      label: "创建时间",
    },
    {
      prop: "status",
      label: "状态",
      formatter: (data) => {
        if (data.status.readyReplicas === undefined) {
          return `0/${data.status.replicas}`
        }
        return `${data.status.readyReplicas}/${data.status.replicas}`
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
const getDeploy = (param) => {
  params.cluster = param.cluster
  params.namespace = param.namespace
  pagination.page = param.page
  getDeploymentList(param).then(response => {
    const {code, data} = response
    if (code !== 200) {
      return
    }
    pagination.total = data.total
    params.list = data.deployments
  }).catch(() => {
    params.list = []
  })
}
const flushPodList = () => {
  getDeploymentList({
    page: pagination.page, size: pagination.size, cluster: params.cluster, namespace: params.namespace
  }).then(response => {
    const {code, data} = response
    if (code !== 200) {
      return
    }
    pagination.total = data.total
    params.list = data.deployments
  }).catch(() => {
    params.list = []
  })
}
const clearData = () => {
  params.list = []
}
const deleteConfirm = (row) => {
  deleteDeployment({zone: params.cluster, namespace: params.namespace, name: row.metadata.name}).then(response => {
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
  const resourceObj = {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: metadata,
    spec: row.spec,
  }
  codeConfig.data = obj2Yaml(resourceObj)
  codeConfig.show = true
}
const relicChange = (row) => {
  console.log(row.spec.replicas)
}
</script>

<template>
  <el-dialog title="详情" v-model="codeConfig.show" width="50%" center>
    <CodeMirror :code="codeConfig.data"></CodeMirror>
    <template #footer>
      <el-button type="warning" plain @click="codeConfig.show=false">更新</el-button>
      <el-button type="primary" plain @click="codeConfig.show=false">关闭</el-button>
    </template>
  </el-dialog>
  <ReTable :pagination="pagination" :columns="params.columns" :data="params.list" @list="getDeploy"
           @clearData="clearData">
    <template #table-ext>
      <el-table-column align="center" label="副本数量">
        <template #default="scope">
          <el-input-number @change="relicChange(scope.row)" :controls="false" controls-position="right" v-model="scope.row.spec.replicas" size="small" :min="0" :max="100" type="number"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" label="暂停更新">
        <template #default="scope">
          <el-switch inline-prompt  size="default" active-text="是" inactive-text="否" v-model="scope.row.spec.paused" style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" @click="detail(scope.row)">编辑</el-button>
          <el-button link type="primary" @click="detail(scope.row)">复制</el-button>
          <el-button link type="primary" @click="detail(scope.row)">更多</el-button>
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