<script setup>
import {Codemirror} from "vue-codemirror";
import {StreamLanguage} from "@codemirror/language"
import {yaml} from "@codemirror/legacy-modes/mode/yaml";

const extensions = [StreamLanguage.define(yaml)];
const props = defineProps({
  code: {type: String, required: true},
  placeholder: {type: String, default: "请输入内充"},
  height: {type: String, default: "400px"},
  width: {type: String, default: "100%"},
})
</script>

<template>
  <Codemirror
      :placeholder="props.placeholder"
      v-model="props.code"
      :extensions="extensions"
      :style="{height: props.height, width: props.width, border: '1px solid grey'}"
  />
</template>

<style scoped lang="scss">

</style>