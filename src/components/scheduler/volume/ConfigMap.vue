<script setup>
import {inject, onMounted, reactive, ref, toRefs} from "vue";
import {useItem} from "../../../store/index.js";
import {ElMessage} from "element-plus";
import {storeToRefs} from "pinia";
import {getConfigMapList} from "../../../api/configMap.js";

const props = defineProps({
  volumeConfig: {
    type: Object,
    default: {}
  },
  method: {
    type: String,
    default: "Created"
  }
})

const data = reactive({
  newVolumeConfig: {
    name: '',
    configMap: {
      name: '',
      defaultMode: 420,
      optional: true,
      items: [],
    }
  },
  items: [],
})

// 订阅发布的方法
const closeDialog = inject("closeAddVolumeDialog")
const useItems = useItem()
const useItemer = storeToRefs(useItem())
const submit = () => {
  if (useItems.item.spec.template.spec.volumes === undefined) {
    useItems.item.spec.template.spec.volumes = []
  }
  useItems.item.spec.template.spec.volumes.forEach(item => {
    if (item.name === newVolumeConfig.value.name) {
      ElMessage.warning("名称不能重复")
      return
    }
  })
  useItems.item.spec.template.spec.volumes.push(JSON.parse(JSON.stringify(newVolumeConfig.value)))
  closeDialog()
}
let {newVolumeConfig, items } = toRefs(data)
const newVolumeConfigRef = ref()
const getVisibleChange =  (visible) => {
  if (!visible) {
    return
  }
  getConfigMapList({page: 1, size: 10000, zone:useItemer.cluster.value, namespace: useItemer.namespace.value}).then((response) => {
    const {configmaps} = response.data
    data.items = configmaps
  })
}
onMounted(()=>{
  if (props.method !== "Created") {
    data.newVolumeConfig = props.volumeConfig
  }
})
const activeName = ref("basic")
const addItem = () => {
  const item = {
    key: "",
    path: "",
    mode: null,
  }
  data.newVolumeConfig.configMap.items.unshift(item)
}
const deleteItem = (index) => {
  data.newVolumeConfig.configMap.items.splice(index, 1)
}
// const oct = (row) => {
//   console.log(row)
//   // if (value.indexOf(0) === 0) {
//   //   //  转换十进制
//   //   value = parseInt(value, 8)
//   // }
//   // if (value > 511) {
//   //   value = 511
//   // }
//   // return value
// }
</script>

<template>
  <el-form :inline="true" :model="newVolumeConfig" ref="newVolumeConfigRef">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="基础配置" name="basic">
        <el-row :gutter="1" style="width: 100%">
          <el-col :span="6" v-if="props.method === 'Created'">
            <el-form-item label="Volume名称" prop="name" required>
              <el-input v-model.trim="newVolumeConfig.name" placeholder="请输入Volume名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="挂载权限" prop="configMap.defaultMode" required>
              <el-input-number :controls="false" v-model="newVolumeConfig.configMap.defaultMode" placeholder="挂载权限"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="名称" prop="configMap.name" required>
              <el-select @visibleChange="getVisibleChange" v-model="newVolumeConfig.configMap.name" placeholder="请选择configMap" style="width: 180px">
                <el-option v-for="iTem in items"
                           :key="iTem.metadata.name" :value="iTem.metadata.name" :label="iTem.metadata.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Key是否存在" prop="configMap.optional">
              <el-switch v-model="newVolumeConfig.configMap.optional"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="自定义挂载" name="items">
        <el-table :border="true" :data="newVolumeConfig.configMap.items" border striped style="width: 100%">
          <el-table-column label="Key" align="center">
            <template #default="scope">
              <el-form-item :prop="('configMap.items.'+ scope.$index+'.key')" required>
                <el-input v-model.trim="scope.row.key"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="路径" align="center">
            <template #default="scope">
              <el-form-item :prop="('configMap.items.'+ scope.$index+'.path')" required>
                <el-input v-model.trim="scope.row.path"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column  label="权限" align="center">
            <template #default="scope">
              <el-form-item>
                <el-input :controls="false" v-model:data="scope.row.mode"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template #header>
              <el-button link type="primary" @click="addItem">添加</el-button>
            </template>
            <template #default="scope">
              <el-button link type="danger" @click="deleteItem(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-col v-if="props.method === 'Created'">
      <el-button type="primary" plain @click="submit()">添加</el-button>
    </el-col>
  </el-form>
</template>

<style scoped lang="scss">

</style>