<script setup>
import {onMounted, ref} from "vue";
const props = defineProps({
  data: {
    type: [String, Number],
  },
  width: {
    type: String,
    default: "60px",
  },
  placeholder: {
    type: String,
    default: "请输入内容"
  }
})
let inputData = ref()
const emits = defineEmits(["update:data"])
const inputChange = () => {
  emits('update:data', Number(inputData.value) ? Number(inputData.value) : inputData.value);
}
onMounted(()=>{
  if (props.data === "" || props.data == null) {
    inputData.value = '';
  }else{
    inputData.value = props.data
  }
})
</script>

<template>
  <!--支持数字和字符串转换-->
  <el-input v-model.trim="inputData" size="default" :placeholder="props.placeholder" :style="{width: props.width}"  @change="inputChange()"/>
</template>

<style scoped lang="scss">

</style>