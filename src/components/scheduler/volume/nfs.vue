<script setup>
import {inject, onMounted, reactive, ref, toRefs} from "vue";
import {useItem} from "../../../store/index.js";
import {ElMessage} from "element-plus";

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
    nfs: {
      server: '',
      path: '',
      readonly: false
    }
  },
})

// 订阅发布的方法
const closeDialog = inject("closeAddVolumeDialog")
const useItems = useItem()
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
const {newVolumeConfig } = toRefs(data)
const newVolumeConfigRef = ref()
onMounted(()=>{
  if (props.method !== "Created") {
    data.newVolumeConfig = props.volumeConfig
  }
})
</script>

<template>
  <el-form :inline="true" :model="newVolumeConfig" ref="newVolumeConfigRef">
    <el-row :gutter="1" style="width: 100%">
      <el-col :span="6" v-if="props.method === 'Created'">
        <el-form-item label="Volume名称" prop="name" required>
          <el-input v-model.trim="newVolumeConfig.name" placeholder="请输入Volume名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="nfs服务地址" prop="nfs.server" required>
          <el-input v-model.trim="newVolumeConfig.nfs.server" placeholder="请输入nfs服务地址"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="nfs挂载路径" prop="nfs.path" required>
          <el-input v-model.trim="newVolumeConfig.nfs.path" placeholder="请输入nfs挂载路径"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="是否只读" prop="nfs.readonly" required>
          <el-switch v-model="newVolumeConfig.nfs.readonly"></el-switch>
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