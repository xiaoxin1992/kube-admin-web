<script setup>

import {User, Grid} from "@element-plus/icons-vue";

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
  </el-icon>
</template>

<style scoped lang="scss">

</style>