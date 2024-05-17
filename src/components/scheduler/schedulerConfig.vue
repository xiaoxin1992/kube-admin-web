<script setup>
import {ref} from "vue";
import Labels from "../Labels.vue";
const props = defineProps({
  list: {
    type: Array,
    default: []
  }
})
const activeNames = ref(['nodeSelector'])
</script>

<template>
  <el-collapse v-model="activeNames" >
    <el-collapse-item title="绑定节点" name="nodeSelector">
      <Labels :list="props.list" key-name="节点标签的Key" value-name="节点标签的value" />
    </el-collapse-item>
  </el-collapse>
</template>

<style scoped lang="scss">

</style>