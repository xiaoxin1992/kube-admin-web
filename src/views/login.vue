<script setup>
import {reactive, ref, watch} from "vue";
import {UserFilled, Lock} from "@element-plus/icons-vue";
import storage from "../utils/storage.js";
import {useRouter} from "vue-router";
import {loginReq} from "../api/login.js";
const router = useRouter()
let btnDisabled = ref(true);
let loginRef = ref()
let loginUser = reactive({
  "username": "",
  "password": ""
})

const loginRule = reactive({
  "username": [
    {required: true, message: "请输入用户名", trigger: "blur"}
  ],
  "password": [
    {required: true, message: "请输入密码", trigger: "blur"}
  ]
})

const loginBtn = ()=>{

  loginReq(loginUser).then((data)=>{
    storage.setItem("users", data)
    router.push({"name": "home"})
  })
}

watch([()=>loginUser.username, ()=>loginUser.password], ()=>{
  loginRef.value.validate((valid)=>{
    btnDisabled.value = !valid;
  })
})

</script>

<template>
  <el-container class="container">
    <el-row>
      <el-card class="card">
        <el-row>
          <el-col><div class="title">后台管理</div></el-col>
        </el-row>
        <el-form
            ref="loginRef"
            :model="loginUser"
            status-icon
            :rules="loginRule"
            class="form"
        >
          <el-row>
            <el-col>
              <el-form-item prop="username">
                <el-input :prefix-icon="UserFilled" type="text" v-model="loginUser.username" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item prop="password">
                <el-input :prefix-icon="Lock" show-password type="password" v-model="loginUser.password" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="1">
            <el-col :span="24">
              <el-form-item>
                  <el-button class="loginBtn" type="primary" :disabled="btnDisabled" @click="loginBtn">登陆</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-row>
  </el-container>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  .card {
    width: 350px;
    .title {
      color: #766f6fbd;
      display: flex;
      justify-content: center;
      padding-bottom: 20px;
    }
    .form {
      .loginBtn {
        width: 100%;
      }
    }
  }
}
</style>