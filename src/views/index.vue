<script setup>

import {createUser} from "../api/users.js";
import {reactive} from "vue";

const data = reactive({
  "username": "admin3",
  "password": "123456",
  "display_name": "超级管理员",
  "role": 1,
  "email": "aaa@qq.com",
  "phone": "11111111111"
})

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