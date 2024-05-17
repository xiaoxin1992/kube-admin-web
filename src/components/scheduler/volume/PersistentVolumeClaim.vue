<script setup>
import {inject, onMounted, reactive, ref, toRefs} from "vue";
import {useItem} from "../../../store/index.js";
import {ElMessage} from "element-plus";
import {getPVCList} from "../../../api/pvc.js";
import {storeToRefs} from "pinia";

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
    persistentVolumeClaim: {
      claimName: '',
      readOnly: false
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
  // getPVCList
  getPVCList({page: 1, size: 10000, zone:useItemer.cluster.value, namespace: useItemer.namespace.value}).then((response) => {
    const {pvc} = response.data
    data.items = pvc
  })
}
onMounted(()=>{
  if (props.method !== "Created") {
    data.newVolumeConfig = props.volumeConfig
  }
})
</script>

<template>
  <el-form :inline="true" :model="newVolumeConfig" ref="newVolumeConfigRef">
    <el-row :gutter="1" style="width: 100%">
      <el-col :span="8" v-if="props.method === 'Created'">
        <el-form-item label="Volume名称" prop="name" required>
          <el-input v-model.trim="newVolumeConfig.name" placeholder="请输入Volume名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="pvc名称" prop="persistentVolumeClaim.claimName" required>
          <el-select @visibleChange="getVisibleChange" v-model="newVolumeConfig.persistentVolumeClaim.claimName" placeholder="请选择pvc" style="width: 220px">
            <el-option v-for="iTem in items"
              :key="iTem.metadata.name" :value="iTem.metadata.name" :label="iTem.metadata.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否只读" prop="persistentVolumeClaim.readonly">
          <el-switch v-model="newVolumeConfig.persistentVolumeClaim.readOnly"></el-switch>
        </el-form-item>
      </el-col>
      <el-col v-if="props.method === 'Created'">
        <el-button type="primary" plain @click="submit()">添加</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>