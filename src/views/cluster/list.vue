<script setup>

import Table from "../../components/Table.vue";
import {reactive, ref} from "vue";
import {getClusterList, createCluster, delCluster, updateCluster} from "../../api/cluster.js";
import {Box, Location} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const opt = ref(false)
const show = ref(false)
const columns = ref([
  {
    prop: "zone",
    label: "区域",
  },
  {
    prop: "host",
    label: "连接地址",
  },
  {
    prop: "version",
    label: "集群版本"
  },
  {
    prop: "remark",
    label: "备注",
  },
  {
    prop: "create_time",
    label: "创建时间",
  }
])
const zoneDisabled = ref(false)
const clusterList = reactive({
  items: []
})

const pagination = reactive({
  total: 1,
  size: 10,
  loading: true,
  placeholder: "请输入集群名称"
})

const reqCluster = reactive({
  page: 1,
  size: 10,
  query: ""
})

const clusterRef = ref()
let clusterReq = reactive({
  form: {
    zone: "",
    host: "",
    token: "",
    remark: ""
  }
})
const clusterRule = reactive({
  "zone": [
    {required: true, message: '请输入区域', trigger: 'blur'},
  ],
  "host": [
    {required: true, message: '请输入地址', trigger: 'blur'},
  ],
  "token": [
    {required: true, message: '请输入token', trigger: 'blur'},
  ],
})
// 获取集群列表
const getList = (param) => {
  reqCluster.page = param.page
  reqCluster.size = param.size
  reqCluster.query = param.query
  getClusters()
}
const getClusters = () => {
  getClusterList({page: reqCluster.page, size: reqCluster.size, query: reqCluster.query}).then(response => {
    const {total, clusters} = response.data
    pagination.total = total
    clusterList.items = clusters
  }).finally(() => {
    pagination.loading = false
  })
}


const deleteCluster = (row) => {
  // 删除集群
  delCluster({zone: row.zone}).then(response => {
    ElMessage.success(response.message)
  }).finally(() => {
    getClusters()
  })
}
const editCluster = () => {
  updateCluster(clusterReq.form).then(response => {
    ElMessage.success(response.message)
  }).finally(() => {
    showDialog()
    getClusters()
  })
}
const addCluster = () => {
  createCluster(clusterReq.form).then(response => {
    ElMessage.success(response.message)
  }).finally(() => {
    showDialog()
    getClusters()
  })
}
const showDialog = () => {
  show.value = !show.value
}

const addClusterDialog = () => {
  opt.value = true
  showDialog()
}
const editClusterDialog = (row) => {
  opt.value = false
  zoneDisabled.value = true
  clusterReq.form = {
    zone: row.zone,
    host: row.host,
    token: row.token,
    remark: row.remark
  }
  showDialog()
}

const commit = () => {
  clusterRef.value.validate(valid => {
    if (valid) {
      if (opt.value) {
        addCluster()
      } else {
        editCluster()
      }
    }
  })
}
const resetFields = () => {
  clusterRef.value.resetFields()
  zoneDisabled.value = false
  clusterReq.form = JSON.parse(JSON.stringify({
    zone: "",
    host: "",
    token: "",
    remark: ""
  }))
}
</script>

<template>
  <el-dialog title="集群信息" :center="true" v-model="show" width="45%" @closed="resetFields()">
    <div class="form">
      <el-form label-position="top" :inline="true" size="default" ref="clusterRef" :model="clusterReq.form"
               :rules="clusterRule">
        <el-row style="width: 100%;">
          <el-col :span="12">
            <el-form-item label="区域" prop="zone" style="padding-right: 16px">
              <el-input :disabled="zoneDisabled" :prefix-icon="Location" v-model="clusterReq.form.zone" clearable
                        placeholder="请输入区域"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="host" style="padding-left: 16px">
              <el-input :prefix-icon="Box" v-model="clusterReq.form.host" clearable placeholder="请输入地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="24">
            <el-form-item label="认证" prop="token">
              <el-input type="textarea" v-model="clusterReq.form.token" clearable placeholder="请输入token"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width: 100%">
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="clusterReq.form.remark" clearable placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <el-button type="success" plain @click="commit">确认</el-button>
      <el-button type="primary" plain @click="showDialog">取消</el-button>
    </template>
  </el-dialog>
  <Table :columns="columns" :data="clusterList.items" :pagination="pagination" @list="getList">
    <template #ext>
      <el-form-item>
        <el-button plain type="primary" @click="addClusterDialog">添加集群</el-button>
      </el-form-item>
    </template>
    <template #table-ext>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="clusterScope">
          <el-button link type="primary" size="small" @click="editClusterDialog(clusterScope.row)">
            修改
          </el-button>
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="是否删除"
              @confirm="deleteCluster(clusterScope.row)">
            <template #reference>
              <el-button link type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </template>
  </Table>

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