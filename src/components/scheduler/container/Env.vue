<script setup>
import {markRaw, ref} from "vue";
import ConfigMapRef from "./envFromType/ConfigMapRef.vue";
import SecretRef from "./envFromType/SecretRef.vue";

const props = defineProps({
  env: {
    type: Array
  },
  envFrom: {
    type: Array
  }
})
const addEnv = () => {
  props.env.unshift({
    name: "",
    value: ""
  })
}
const deleteEnv = (env, index) => {
  env.splice(index, 1)
}
const showAddEnvFromDialog = ref(false)
const envFromType = ref("ConfigMap")
const envFromTypeRef = {
  "ConfigMap": markRaw(ConfigMapRef),
  "Secret": markRaw(SecretRef)
}
const addEnvFrom = () => {
  showAddEnvFromDialog.value = true
}
const CloseAddEnvFrom = () => {
  showAddEnvFromDialog.value = false
}
const activeName = ref("env")
</script>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="逐个配置" name="env">
      <el-table
          border
          :data="props.env"
          height="300px"
      >
        <el-table-column align="center" prop="name" label="变量名称">
          <template #default="scope">
            <el-form-item label-width="0" style="margin-bottom: 0; width: 100%">
              <el-input v-model.trim="scope.row.name" placeholder="请输入变量名称"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="变量值">
          <template #default="scope">
            <el-form-item label-width="0" style="margin-bottom: 0; width: 100%">
              <el-input style="width: 100%" v-model.trim="scope.row.value" placeholder="请输入变量值"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #header>
            <el-button link type="primary" @click="addEnv">添加</el-button>
          </template>
          <template #default="scope">
            <el-button link type="warning" @click="deleteEnv(props.env, scope.row.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="批量配置" name="envFrom">
      <el-table
          border
          :data="props.envFrom"
          height="300px"
      >
        <el-table-column align="center" prop="prefix" title="变量前缀可以每个变量添加前缀" label="变量前缀">
          <template #default="scope">
            <el-form-item label-width="0" style="margin-bottom: 0; width: 100%">
              <el-input v-model.trim="scope.row.prefix" placeholder="请输入变量前缀"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="类型">
          <template #default="scope">
            <span>{{scope.row.configMapRef?'ConfigMap': 'Secret'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="config" label="变更配置">
          <template #default="scope">
            <component :key="Math.random()" :is="envFromTypeRef[scope.row.configMapRef?'ConfigMap': 'Secret']" :envFrom="props.envFrom" :envFromItem="scope.row" method="Update"></component>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #header>
            <el-button link type="primary" @click="addEnvFrom">添加</el-button>
          </template>
          <template #default="scope">
            <el-button link type="warning" @click="deleteEnv(props.envFrom, scope.row.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-dialog v-model="showAddEnvFromDialog" title="生成环境变量" center destroy-on-close>
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <div>
              <el-radio-group v-model="envFromType">
                <el-radio value="ConfigMap">ConfigMap</el-radio>
                <el-radio value="Secret">Secret</el-radio>
              </el-radio-group>
            </div>
          </div>
        </template>
        <div><component :key="Math.random()"  :is="envFromTypeRef[envFromType]" method="Create"  :envFrom="props.envFrom" @close="CloseAddEnvFrom"></component></div>
      </el-card>
    </el-dialog>
  </el-tabs>
</template>

<style scoped lang="scss">

</style>