<script setup>
import Table from "../../components/Table.vue";
const columns = ref([
    {
      prop: "username",
      label: "用户名",
    },
    {
      prop: "display_name",
      label: "用户名称",
    },
    {
      prop: "role",
      label: "类型",
      formatter: (col)=>{
        if (col.role===1) {
          return "管理员"
        }else{
          return "普通用户"
        }
      }
    },
    {
      prop: "phone",
      label: "手机号码",
    },
    {
      prop: "email",
      label: "邮箱",
    },
    {
      prop: "create_time",
      label: "创建时间",
    },
    {
      prop: "update_time",
      label: "更新时间"
    },
  ])
let userList = ref([
  {
    "id": 10,
    "username": "admin3",
    "display_name": "超级管理员",
    "role": 1,
    "email": "aaa@qq.com",
    "phone": "11111111111",
    "create_time": "2024-05-10 10:19:41",
    "update_time": "2024-05-10 10:19:41"
  },
  {
    "id": 8,
    "username": "admin2",
    "display_name": "超级管理员",
    "role": 1,
    "email": "aaa@qq.com",
    "phone": "11111111111",
    "create_time": "2024-04-29 07:52:33",
    "update_time": "2024-04-29 07:52:33"
  },
  {
    "id": 7,
    "username": "admin1",
    "display_name": "超级管理员",
    "role": 1,
    "email": "aaa@qq.com",
    "phone": "11111111111",
    "create_time": "2024-04-29 07:52:30",
    "update_time": "2024-04-29 07:52:30"
  },
  {
    "id": 6,
    "username": "admin",
    "display_name": "超级管理员",
    "role": 1,
    "email": "aaa@qq.com",
    "phone": "11111111111",
    "create_time": "2024-04-29 07:13:17",
    "update_time": "2024-04-29 07:13:17"
  }
])

</script>

<template>
  <div>
    <Table :columns="columns" :data="userList"></Table>
  </div>
</template>

<style scoped lang="scss">

</style>