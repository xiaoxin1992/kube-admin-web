<script setup>

import {User, Grid, Setting, Monitor, GobletSquareFull, Histogram, TrendCharts, SetUp} from "@element-plus/icons-vue";

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
    <User v-if="props.name==='User'"/>
    <Grid v-if="props.name==='Grid'"/>
    <Setting v-if="props.name==='Setting'"/>
    <Monitor v-if="props.name==='Monitor'"/>
    <GobletSquareFull v-if="props.name==='GobletSquareFull'"/>
    <Histogram v-if="props.name==='Histogram'"/>
    <TrendCharts v-if="props.name==='TrendCharts'"/>
    <SetUp v-if="props.name==='SetUp'"/>
  </el-icon>
</template>

<style scoped lang="scss">

</style>