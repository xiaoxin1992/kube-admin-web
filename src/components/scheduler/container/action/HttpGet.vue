<script setup>
import CNInput from "../../../CNInput.vue";
import {ref} from "vue";

const props = defineProps({
  probeConfig: {
    type: Object
  },
  containerIndex: {
    type: Number
  },
  probeType: {
    type: String
  },
  containerType: {
    type: String
  }
})
const rules = {
  ports: [
    {required: true, message: "请输入探测端口号", trigger: 'blur'}
  ]
}
const isHeaders = ref(false)

const delHeader = (index) => {
  props.probeConfig.httpGet.httpHeaders.splice(index, 1)
}
const addHeader = () => {
  props.probeConfig.httpGet.httpHeaders.unshift({
    name: "",
    value: ""
  })
}
const closeHeader = (isClose) => {
  if (!isClose) {
    props.probeConfig.httpGet.httpHeaders = []
  }
}
</script>

<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-form-item label="请求端口" :rules="rules.ports"
                    :prop="('spec.template.spec.containers.'+props.containerIndex+'.'+props.probeType+'.httpGet.port')"
                    style="width: 100%">
        <CNInput v-model:data="props.probeConfig.httpGet.port" style="width: 100%" placeholder="请输入端口号"/>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="请求主机" style="width: 100%">
        <el-input v-model="props.probeConfig.httpGet.host" placeholder="请输入主机名"/>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="请求路径" style="width: 100%">
        <el-input v-model="props.probeConfig.httpGet.path" placeholder="请输入请求路径"/>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
      <el-form-item label="请求类型" style="width: 100%">
        <el-select v-model="props.probeConfig.httpGet.scheme">
          <el-option label="HTTP" value="HTTP"></el-option>
          <el-option label="HTTPS" value="HTTPS"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="自定义请求头" style="width:100%; padding-left: 10px">
        <el-switch @change="closeHeader" v-model="isHeaders"></el-switch>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row v-if="isHeaders">
    <el-col :span="24">
      <el-table
      border
      :data="props.probeConfig.httpGet.httpHeaders"
      >
        <el-table-column align="center" prop="name" label="请求头名称">
          <template #default="scope">
            <el-input v-model.trim="scope.row.name" placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="value" label="请求头值">
          <template #default="scope">
            <el-input v-model.trim="scope.row.value" placeholder="请求头值"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template #header>
            <el-button link type="primary" @click="addHeader">添加</el-button>
          </template>
          <template #default="scope">
            <el-button link type="danger" @click="delHeader(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">

</style>