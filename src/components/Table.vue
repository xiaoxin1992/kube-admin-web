<script setup>
  import {Search} from "@element-plus/icons-vue";

  const props = defineProps({
    data: { type: Array, required: true },
    columns: { type: Array, required: true },
  })
</script>

<template>
  <el-form :inline="true" :size="'default'" @submit.native.prevent>
    <el-form-item>
      <el-input size="default" type="text" :prefix-icon="Search"
                placeholder="props.placeholder"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="default" plain>
        <el-icon>
          <search/>
        </el-icon>&nbsp;搜索
      </el-button>
    </el-form-item>
    <slot name="ext"></slot>
  </el-form>
  <el-table :data="props.data" :size="'default'">
    <el-table-column fixed align="center" v-for="column in props.columns" :key="column.prop" :prop="column.prop" :label="column.label" :formatter="column.formatter" :width="column.width"></el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">
          修改
        </el-button>
        <el-button link type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination background layout="prev, pager, next" prev-text="上一页"	next-text="下一页" :total="20" />
  </div>
</template>

<style scoped lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
</style>