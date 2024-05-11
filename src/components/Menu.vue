<script setup>

import Icon from "./Icon.vue";
import {menus} from "../config/menus.js";
</script>

<template>
    <el-menu
        :default-active="$route.path"
        router
        class="menu"
    >
      <template v-for="menu in menus">
        <el-menu-item v-if="menu.type===1" :index="menu.path">
          <Icon :name="menu.icon"></Icon>
          <span>{{menu.title}}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="menu.path">
          <template #title>
            <Icon :name="menu.icon"></Icon>
            <span>{{menu.title}}</span>
          </template>
          <el-menu-item v-for="child in menu.children" :index="child.path">{{child.title}}</el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
</template>

<style scoped lang="scss">
.menu {
  width: 100%;
  height: 100%;
}
</style>