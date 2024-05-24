<script setup>

import CodeMirror from "./CodeMirror.vue";
import {computed, onBeforeMount, onUpdated, ref} from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  yamlContent: {
    type: String,
    default: ""
  }
})
let yamlData = ref("")
onUpdated(()=>{
  yamlData.value = props.yamlContent
})
let showDialog = computed({
  get() {
    return props.show
  },
  set(val) {
    emits("close", val)
  }
})

const emits = defineEmits(['close'])
</script>

<template>
  <el-dialog title="详情" v-model="showDialog" width="50%" center>
    <CodeMirror :code="yamlData"></CodeMirror>
<!--    <template #footer>-->
<!--      <el-button type="warning" plain @click="codeConfig.show=false">更新</el-button>-->
<!--      <el-button type="primary" plain @click="codeConfig.show=false">关闭</el-button>-->
<!--    </template>-->
  </el-dialog>
</template>

<style scoped lang="scss">

</style>