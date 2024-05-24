<script setup>
const props = defineProps({
  data: {
    type: [String, Number]
  },
  defaultValue: {
    type: Number,
    default: 420
  }
})

// 八进制转10进制
const convertToOct = (value) => {
  value = value.trim()
  if (value.indexOf('0') === 0) {
    value = parseInt(value, 8)
    value = isNaN(value) ? props.defaultValue : value
  }
  value = parseInt(value, 10)
  value = isNaN(value) ? props.defaultValue : value
  if (value > 511) {
    value = 511
  }
  return value
}

// 数据更新处理
const emits = defineEmits(['update:data']);
const inputModify = (value) => {
  console.log(value)
  emits("update:data", value)
}
const changeValue = (value) => {
  console.log(value)
  value = convertToOct(value)
  emits("update:data", value)
}
</script>

<template>
  <!--
  输入8进制的数据会自动转换成10进制， 主要用于k8s configmap或secret中mode的输入
  使用用例
  script 配置
  {
      const inputData = ref("")
  }
  <OctalInput v-model:data="inputData" :defaultValue=420></OctalInput>
  -->
  <el-input @input="inputModify" @change="changeValue" :model-value="data"></el-input>
</template>

<style scoped>

</style>