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
    hostPath: {
      type: '',
      path: ''
    }
  },
  mountTypeList: [
    {label: "默认不检查", value: ""},
    {label: "目录类型(不存在则创建)", value: "DirectoryOrCreate"},
    {label: "目录类型(不存在无法挂载)", value: "Directory"},
    {label: "文件类型(不存在无法挂载)", value: "File"},
    {label: "BlockDevice类型(不存在无法挂载)", value: "BlockDevice"},
    {label: "文件类型(不存在则创建)", value: "FileOrCreate"},
    {label: "Socket类型", value: "Socket"},
    {label: "CharDevice类型", value: "CharDevice"},

  ],
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
const {newVolumeConfig, mountTypeList} = toRefs(data)
const newVolumeConfigRef = ref()
onMounted(()=>{
  if (props.method !== "Created") {
    data.newVolumeConfig = props.volumeConfig
  }
})
</script>

<template>
  <el-form :inline="true" :model="newVolumeConfig" ref="newVolumeConfigRef">
    <el-row>
      <el-col :span="8" v-if="props.method === 'Created'">
        <el-form-item label="Volume名称" prop="name" required>
          <el-input v-model.trim="newVolumeConfig.name" placeholder="请输入Volume名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="宿主机路径" prop="hostPath.path" required>
          <el-input v-model.trim="newVolumeConfig.hostPath.path" placeholder="请输入宿主机路径"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="挂载类型" prop="hostPath.type">
          <el-select :empty-values="[null, undefined]" v-model.trim="newVolumeConfig.hostPath.type" placeholder="请选择挂载类型" style="width: 220px;">
            <el-option v-for="item in mountTypeList" :key="item.label" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
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