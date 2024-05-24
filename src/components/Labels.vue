<script setup>

const props = defineProps({
  list: {
    type: Array,
    default: []
  },
  keyName: {
    type: String,
    default: "key"
  },
  valueName: {
    type: String,
    default: "value"
  },
  valueInputType: {
    type: String,
    default: "text"
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

const addTableRow = () => {
  const labelRow = {
    key: "",
    value: ""
  }
  props.list.unshift(labelRow)
}

const deleteTableRow = (index) => {
  props.list.splice(index, 1)
}

</script>

<template>
  <el-table :data="props.list" border style="width: 100%" height="320px">
    <el-table-column align="center" prop="key" :label="props.keyName">
      <template #default="scope">
        <el-input :readonly="props.readonly" v-model="scope.row.key" placeholder="请输入key"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="value" :label="props.valueName">
      <template #default="scope">
        <el-input :readonly="props.readonly" v-model="scope.row.value" :type="props.valueInputType" placeholder="请输入value"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" fixed="right" width="140px">
      <template #header>
        <el-button :disabled="props.readonly" link type="primary"   @click="addTableRow()">添加</el-button>
      </template>
      <template #default="scope">
        <el-button  :disabled="props.readonly" link type="danger"   @click="deleteTableRow(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">
</style>