<script setup>
  import {Search} from "@element-plus/icons-vue";
  import {onBeforeMount, reactive} from "vue";

  const props = defineProps({
    data: { type: Array, required: true },
    columns: { type: Array, required: true },
    pagination: {
      type: Object,
      required: true
    },
  })
  const pagination = reactive({
    page: 1,
    size: props.pagination.size,
    query: ""
  })
  const emit = defineEmits(["list"])
  const getList = () => {
    emit("list", pagination)
  }
  onBeforeMount(()=>{
    getList()
  })
</script>

<template>
  <el-form :inline="true" :size="'default'" @submit.native.prevent>
    <el-form-item>
      <el-input size="default" type="text" :prefix-icon="Search"
                :placeholder="props.pagination.placeholder" v-model="pagination.query"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="default" plain @click="getList()">
        <el-icon>
          <search/>
        </el-icon>&nbsp;搜索
      </el-button>
    </el-form-item>
    <slot name="ext"></slot>
  </el-form>
  <el-table v-loading="props.pagination.loading" :data="props.data" :size="'default'">
    <el-table-column fixed align="center" v-for="column in props.columns" :key="column.prop" :prop="column.prop" :label="column.label" :formatter="column.formatter" :width="column.width"></el-table-column>
    <slot name="table-ext"></slot>
  </el-table>
  <div class="pagination">
    <el-pagination @change="getList()" v-model:current-page="pagination.page" background layout="prev, pager, next" prev-text="上一页"	next-text="下一页" :page-size="props.pagination.size" :total="props.pagination.total" />
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