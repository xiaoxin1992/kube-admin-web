<script setup>
import {storeToRefs} from "pinia";
import {useItem} from "../../../store/index.js";
import {ElMessage} from "element-plus";

const props = defineProps({
  volumeMounts: {
    type: Array,
    default: []
  }
})
const {item} = storeToRefs(useItem())
const useItemer = useItem()
const addMount = () => {
  if (useItemer.item.spec.template.spec.volumes.length === 0) {
    ElMessage.warning("请先添加volume!")
    return
  }
  props.volumeMounts.unshift({
    name: "",
    mountPath: "",
    readOnly: false,
    subPath: ""
  })
}
const deleteMount = (mount, index) => {
  mount.splice(index, 1)
}
</script>

<template>
  <el-table
      border
      :data="props.volumeMounts"
      height="300px"
  >
    <el-table-column align="center" prop="name" label="选择mount">
      <template #default="scope">
        <el-form-item label-width="0" style="margin-bottom: 0; width: 100%">
          <el-select v-model.trim="scope.row.name">
            <el-option v-for="volume in item.spec.template.spec.volumes" :label="volume.name"
                       :value="volume.name"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column prop="mountPath" label="mount挂载路径">
      <template #default="scope">
        <el-form-item label-width="0" style="margin-bottom: 0; width: 100%">
          <el-input style="width: 100%" v-model.trim="scope.row.mountPath" placeholder="Mount挂载路径"></el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column prop="subPath" label="挂载子路径">
      <template #default="scope">
        <el-form-item label-width="0" style="margin-bottom: 0; width: 100%">
          <el-input style="width: 100%" v-model.trim="scope.row.subPath" placeholder="挂载子路径"></el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column prop="readOnly" label="是否只读">
      <template #default="scope">
        <el-form-item label-width="0" style="margin-bottom: 0; width: 100%">
          <el-switch style="width: 100%" v-model="scope.row.readOnly" placeholder="挂载子路径"></el-switch>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #header>
        <el-button link type="primary" @click="addMount">添加</el-button>
      </template>
      <template #default="scope">
        <el-button link type="warning" @click="deleteMount(props.volumeMounts, scope.row.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>