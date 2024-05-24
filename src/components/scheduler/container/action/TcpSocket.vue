<script setup>
import CNInput from "../../../CNInput.vue";

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

</script>

<template>
  <el-row>
    <el-col :span="10">
      <el-form-item label="请输入端口号" :rules="rules.ports" :prop="('spec.template.spec.containers.'+props.containerIndex+'.'+props.probeType+'.tcpSocket.port')" style="width: 100%">
        <CNInput v-model:data="props.probeConfig.tcpSocket.port" style="width: 100%"  placeholder="请输入端口号"/>
      </el-form-item>
    </el-col>
    <el-col :span="10" style="margin-left: 10px">
      <el-form-item label="请输入主机名" style="width: 100%">
        <el-input v-model="props.probeConfig.tcpSocket.host"  placeholder="请输入主机名"/>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">

</style>