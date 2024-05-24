<script setup>
import Probe from "./Probe.vue";

const props = defineProps({
  container: {
    type: Object,
    required: true
  },
  containerIndex: {
    type: Number
  },
  containerType: {
    type: String
  },
})
// onBeforeMount(()=>{
//   if (!props.container.hasOwnProperty('startupProbe')) {
//     props.container["startupProbe"] = {}
//   }
// })
</script>

<template>
  <Probe :containerType="props.containerType" :containerIndex="props.containerIndex" :probe="props.container.startupProbe" probe-type="startupProbe" title="启动探针(startupProbe)" @probe-change-roll-back="(value) => {props.container.startupProbe=value}" />
  <Probe :containerType="props.containerType" :containerIndex="props.containerIndex" :probe="props.container.livenessProbe" probe-type="livenessProbe" title="存活探针(LivenessProbe)" @probe-change-roll-back="(value) => {props.container.livenessProbe=value}"/>
  <Probe :containerType="props.containerType" :containerIndex="props.containerIndex" :probe="props.container.readinessProbe" probe-type="readinessProbe" title="就绪探针(ReadinessProbe)" @probe-change-roll-back="(value) => {props.container.readinessProbe=value}" />
</template>

<style scoped lang="scss">

</style>