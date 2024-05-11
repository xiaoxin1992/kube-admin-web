<script setup>

import {createUser} from "../api/users.js";
import {reactive} from "vue";

const data = reactive({})

const reqs = ()=>{
  createUser(data).then((data)=>{
    console.log(data)
  })
}
</script>

<template>
  <div>index</div>
  <div>
    <el-button @click="reqs"></el-button>
  </div>
</template>

<style scoped lang="scss">

</style>