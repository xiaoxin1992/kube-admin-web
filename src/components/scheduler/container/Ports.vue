<script setup>
const props = defineProps({
  ports: {
    type: Array,
    default: []
  }
})
const addPort = () => {
  const port = {
    name: "",
    containerPort: 8080,
    protocol: "TCP"
  }
  props.ports.unshift(port)
}
const deletePort = (ports, index) => {
  ports.splice(index, 1)
}
</script>

<template>
  <el-table
      border
      :data="props.ports"
      height="300px"
  >
    <el-table-column align="center" prop="name" label="端口名称">
      <template #default="scope">
        <el-form-item label-width="0" style="margin-bottom: 0; width: 100%">
          <el-input v-model.trim="scope.row.name" placeholder="请输入端口名称"></el-input>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column prop="containerPort" label="容器端口">
      <template #default="scope">
        <el-form-item label-width="0" style="margin-bottom: 0; width: 100%">
          <el-input-number style="width: 100%" :min="1" :max="65535" :controls="false" v-model.trim="scope.row.containerPort"
                           placeholder="容器端口"></el-input-number>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column prop="protocol" label="协议">
      <template #default="scope">
        <el-form-item style="width: 100%; margin-bottom: 0" label-width="0">
          <el-select v-model="scope.row.protocol" placeholder="请选择协议">
            <el-option label="TCP" value="TCP"></el-option>
            <el-option label="UDP" value="UDP"></el-option>
            <el-option label="SCTP" value="SCTP"></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #header>
        <el-button link type="primary" @click="addPort()">添加</el-button>
      </template>
      <template #default="scope">
        <el-button link type="warning" @click="deletePort(props.ports, scope.row.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>