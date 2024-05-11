<script setup>

import {Grid, Location, SwitchButton, User} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import storage from "../utils/storage.js";
import {userStore} from "../store/index.js";

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
            <span>{{username}}</span>&nbsp;<el-button text circle :icon="SwitchButton" @click="logout"></el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="content">
      <el-aside width="200px">
        <el-menu
            default-active="index"
            class="menu"
        >
          <el-menu-item index="index">
            <el-icon><Grid /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="3">
            <el-icon><User /></el-icon>
            <span>用户列表</span>
          </el-menu-item>
        </el-menu>
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
    .menu {
      width: 100%;
      height: 100%;
    }
  }
}
</style>