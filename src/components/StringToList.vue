<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  data: {
    type: Array,
  },
  placeholder: {
    type: String,
    default: "请输入命令"
  }
})
const emits = defineEmits(["update:data"])
const inputChanged = (value) => {
  emits("update:data", value.trim().split("\n"))
}
const inputData = ref("")
onMounted(()=> {
  if (props.data) {
    inputData.value = props.data.join("\r\n")
  }
})
</script>

<template>
  <el-input type="textarea"  @change="inputChanged" v-model="inputData" :placeholder="props.placeholder" style="width: 100%"></el-input>
</template>

<style scoped lang="scss">

</style>