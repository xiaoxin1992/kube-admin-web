<script setup>
import {onBeforeMount, reactive, ref} from "vue";
import {createNS, delNS, getNSList} from "../../api/namespace.js";
import {getClusterList} from "../../api/cluster.js";
import KubeTable from "../../components/KubeTable.vue";
import {Box} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const show = ref(false)
const addNSRef = ref()
const addNSRule = reactive({
  "name": [
    {required: true, message: '请输入命名空间', trigger: 'blur'},
  ],
})
const tableConfig = reactive({
  search: false
})
const columns = ref([
  {
    prop: "name",
    label: "名称",
  },
  {
    prop: "createTime",
    label: "创建时间",
  },
  {
    prop: "status",
    label: "状态",
  }
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

const reqNS = reactive({
  page: pagination.size,
  size: pagination.size,
  query: ""
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
  reqNS.page = param.page
  reqNS.size = param.size
  getNS()
}
const getNS = () => {
  getNSList({page: reqNS.page, size: reqNS.size, zone: tableReq.form.zone}).then(response => {
    const {total, namespace} = response.data
    pagination.total = total
    nsList.items = namespace
  }).catch(() => {
    nsList.items = []
  })
}
const addNSShow = () => {
  if (tableReq.form.zone.trim().length === 0) {
    ElMessage.warning("请选择集群!")
    return
  }
  show.value = !show.value
}

const resetFields = () => {
  addNSRef.value.resetFields()
}

const deleteNamespace = (row) => {
  delNS({
    zone: tableReq.form.zone.trim(), name: row.name
  }).then(response => {
    const {code, message} = response
    ElMessage.success(message)
    if (code === 200) {
      getNS()
    }
  })
}

const submit = () => {
  const req = {
    zone: tableReq.form.zone.trim(),
    namespace: {
      metadata: {
        name: tableReq.addNS.name
      }
    }
  }
  createNS(req).then(response => {
    const {code, message} = response
    ElMessage.success(message)
    if (code) {
      getNS()
    }
  }).finally(() => {
    show.value = false
  })
}
onBeforeMount(() => {
  getClusters()
})
</script>

<template>
  <el-dialog title="添加命名空间" :center="true" v-model="show" width="20%" @closed="resetFields()">
    <div class="form">
      <el-form :inline="true" size="default" ref="addNSRef" :model="tableReq.addNS" :rules="addNSRule">
        <el-form-item label="命名空间" prop="name">
          <el-input :prefix-icon="Box" v-model="tableReq.addNS.name" clearable
                    placeholder="请输入命名空间名称"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button type="success" plain @click="submit">确认</el-button>
      <el-button type="primary" plain @click="show=false">取消</el-button>
    </template>
  </el-dialog>
  <KubeTable :columns="columns" :data="nsList.items" :pagination="pagination" :config="tableConfig" @list="getList">
    <template #ext>
      <el-form-item style="margin-right: 32px">
        <el-button plain type="primary" @click="addNSShow">添加命名空间</el-button>
      </el-form-item>
      <el-form-item style="width: 15%">
        <el-select v-model="tableReq.form.zone" size="default" placeholder="请选择集群" @change="getNS">
          <el-option v-for="item in tableReq.form.zones" :label="item.zone" :value="item.zone"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template #table-ext>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="clusterScope">
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="是否删除"
              @confirm="deleteNamespace(clusterScope.row)">
            <template #reference>
              <el-button link type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
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