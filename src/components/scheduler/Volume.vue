<script setup>
import {useItem} from "../../store/index.js";
import {storeToRefs} from "pinia";
import {computed, markRaw, provide, reactive, ref, toRefs} from "vue";
import HostPath from "./volume/HostPath.vue";
import Secret from "./volume/Secret.vue";
import ConfigMap from "./volume/ConfigMap.vue";
import nfs from "./volume/nfs.vue";
import EmptyDir from "./volume/EmptyDir.vue";
import PersistentVolumeClaim from "./volume/PersistentVolumeClaim.vue";

const useItemer = useItem()
const {item} = storeToRefs(useItem())
const addVolume = () => {
  showAddVolume.value = true
}
let showAddVolume = ref(false)
const data = reactive({
  volumeTypeList: ["hostPath", "secret", "configMap", "nfs",  "emptyDir", "persistentVolumeClaim"],
  volumeTypeComp: {
    "hostPath": markRaw(HostPath),
    "secret": markRaw(Secret),
    "configMap": markRaw(ConfigMap),
    "nfs": markRaw(nfs),
    "emptyDir": markRaw(EmptyDir),
    "persistentVolumeClaim": markRaw(PersistentVolumeClaim),
  }
})
let volumeType = ref("hostPath")
const { volumeTypeComp } = toRefs(data)
const deleteTableRow = (index) => {
  useItemer.item.spec.template.spec.volumes.splice(index, 1)
}
const closeAddVolumeDialog = () => {
  showAddVolume.value = false
}

// 发布订阅方式
provide('closeAddVolumeDialog', closeAddVolumeDialog)

// 获取volume类型
const getVolumeType = computed(()=>(volumeItem)=>{
  const KeyList = Object.keys(volumeItem)
  return KeyList[1]
})
</script>

<template>
  <el-table border :data="item.spec.template.spec.volumes" style="width: 100%" height="400px">
    <el-table-column align="center" prop="" label="名称" width="200px">
      <template #default="scope">
        <el-input v-model="scope.row.name" placeholder="请输入存储卷名称"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="类型" width="200px">
      <template #default="scope">
        <span>{{getVolumeType(scope.row)}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" align="center" label="Volume配置">
      <template #default="scope">
        <component :is="volumeTypeComp[getVolumeType(scope.row)]" method="Update" :volumeConfig="scope.row"></component>
      </template>
    </el-table-column>
    <el-table-column align="center" fixed="right" width="200px">
      <template #header>
        <el-button link type="primary" @click="addVolume()">添加</el-button>
      </template>
      <template #default="scope">
        <el-button link type="warning" @click="deleteTableRow(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="showAddVolume" title="添加Volume" center destroy-on-close width="60%">
    <el-card style="max-width: 100%" shadow="never">
      <template #header>
        <div class="card-header">
          <el-select v-model="volumeType">
            <el-option v-for="item in data.volumeTypeList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
      </template>
      <component :is="volumeTypeComp[volumeType]"></component>
    </el-card>
  </el-dialog>
</template>

<style scoped lang="scss">
.card-header {
  width: 20%;
}
</style>