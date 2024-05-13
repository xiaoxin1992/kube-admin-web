<script setup>

import {User, Grid, Setting, Monitor, GobletSquareFull} from "@element-plus/icons-vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: "Position"
  }
})

</script>

<template>
  <el-icon>
    <User v-if="props.name==='User'" />
    <Grid v-if="props.name==='Grid'" />
    <Setting v-if="props.name==='Setting'" />
    <Monitor v-if="props.name==='Monitor'" />
    <GobletSquareFull v-if="props.name==='GobletSquareFull'" />
  </el-icon>
</template>

<style scoped lang="scss">

</style>