<script setup>
import {inject, onBeforeMount, onMounted, reactive, ref, toRefs} from "vue";
import {useItem} from "../../../store/index.js";
import {ElMessage} from "element-plus";
import CNInput from "../../CNInput.vue";

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
    emptyDir: {
      medium: '',
      sizeLimit: 0
    }
  },
  mountTypeList: [
    {label: "默认", value: ''},
    {label: "内存", value: "Memory"},
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
onBeforeMount(()=>{
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
        <el-form-item label="挂载类型" prop="emptyDir.medium">
          <el-select :empty-values="[null, undefined]" v-model.trim="newVolumeConfig.emptyDir.medium" placeholder="请选择挂载类型" style="width: 220px;">
            <el-option v-for="item in mountTypeList" :key="item.label" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="限制大小" prop="emptyDir.sizeLimit">
          <CNInput v-model:data="newVolumeConfig.emptyDir.sizeLimit" placeholder="请输入限制大小" width="150px"></CNInput>
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