<script setup>
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import storage from "../utils/storage.js";
import {userStore} from "../store/index.js";
import Menu from "../components/Menu.vue";
import {SwitchButton} from "@element-plus/icons-vue";

const {username} = storeToRefs(userStore())



const router = useRouter()
const logout = () =>{
  storage.deleteAll()
  router.push("login")
}
</script>

<template>
  <el-container class="container">
    <el-header class="header">
      <el-row justify="space-between" class="row">
        <el-col :span="12">
          <div class="logo">
            <img alt="logo" src="../assets/logo.png">&nbsp;<span>kube-admin</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="logout">
            <span>{{username}}</span>&nbsp;<el-button text circle @click="logout"><el-icon><SwitchButton /></el-icon></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="content">
      <el-aside width="200px">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  background-color: #ffffff;
  height: 100vh;
  .header {
    padding-left: 0;
    background-color: #ffffff;
    border-bottom: 1px solid var(--el-border-color);
    .row {
      height: 100%;
      .logo {
        width: 200px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .logout {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
        font-size: 14px;
      }
    }
  }
  .content {

  }
}
</style>