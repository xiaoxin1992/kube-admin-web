<script setup>

import StringToList from "../../../StringToList.vue";

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
  command: [
    {required: true, message: "请输入探测命令", trigger: 'blur'}
  ]
}
</script>

<template>
  <el-form-item style="width: 100%" label="探测命令" :rules="rules.command" :prop="(props.containerType!='init'?'spec.template.spec.containers.'+props.containerIndex+'.'+props.probeType+'.exec.command': 'spec.template.spec.initContainers.'+props.containerIndex+'.'+props.probeType+'.exec.command')" required>
    <StringToList v-model:data="props.probeConfig.exec.command" placeholder="请输入探测命令"></StringToList>
  </el-form-item>
</template>

<style scoped lang="scss">

</style>