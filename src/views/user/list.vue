<script setup>
import Table from "../../components/Table.vue";
import {reactive, ref} from "vue";
import {createUser, getUserList, changeUserPassword, dropUser} from "../../api/users.js";
import {Box, Iphone, Key, User} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

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
    formatter: (col) => {
      if (col.role === 1) {
        return "管理员"
      } else {
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
  }
])
const userList = reactive({
  items: []
})
const pagination = reactive({
  total: 1,
  size: 10,
  loading: true,
  placeholder: "请输入用户名"
})
const reqGetList = reactive({
  page: 1,
  size: 10,
  query: ""
})
const getList = (param) => {
  reqGetList.page = param.page
  reqGetList.size = param.size
  reqGetList.query = param.query
  getUserList({page: param.page, size: param.size, query: param.query}).then(response => {
    const {data, total} = response.data
    userList.items = data
    pagination.total = total
  }).finally(() => {
    pagination.loading = false
  })
}
let opt = ref(true)
const userTypes = reactive([
  {
    value: 1,
    label: "管理员"
  },
  {
    value: 2,
    label: "普通用户"
  }
])
const userInfo = reactive({
  username: "",
  password: "",
  display_name: "",
  role: 1,
  email: "",
  phone: ""
})
const useraddRule = reactive({
  "username": [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  "password": [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
  "display_name": [
    {required: true, message: '请输入名称', trigger: 'blur'},
  ],
  "role": [
    {required: true, message: '请选择类型', trigger: 'blur'},
  ],
  "email": [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
  ],
  "phone": [
    {required: true, message: '请输入手机号码', trigger: 'blur'},
  ],
})
const resetPassword = reactive({
  username: "",
  password: ""
})
const resetPasswordRule = reactive({
  "username": [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  "password": [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
})
let userinfoRef = ref()
let resetPasswordRef = ref()
const show = ref(false)

const visible = () => {
  show.value = false
}

const addUser = () => {
  // 添加用户
  opt.value = true
  show.value = true
}
const changePassword = (row) => {
  resetPassword.username = row.username
  opt.value = false
  show.value = true
}

const resetFields = () => {
  if (opt.value) {
    userinfoRef.value.resetFields()
  } else {
    resetPasswordRef.value.resetFields()
  }
  getList(reqGetList)
}

const submit = () => {
  if (opt.value) {
    userinfoRef.value.validate((valid) => {
      if (valid) {
        createUser(userInfo).then(response => {
          ElMessage.success(response.message)
          if (response.code === 200) {
            visible()
          }
        })
      }
    })
  } else {
    resetPasswordRef.value.validate((valid) => {
      if (valid) {
        changeUserPassword(resetPassword).then(response => {
          ElMessage.success(response.message)
          if (response.code === 200) {
            visible()
          }
        })
      }
    })
  }
}

const deleteUser = (row) => {
  dropUser({"username": row.username}).then(response => {
    ElMessage.success(response.message)
    if (response.code === 200) {
      visible()
    }
  }).finally(() => {
    getList(reqGetList)
  })
}
</script>

<template>
  <div>
    <el-dialog title="用户信息" :center="true" v-model="show" width="45%" @closed="resetFields()">
      <div class="form" v-if="opt">
        <el-form :inline="true" size="default" ref="userinfoRef" :model="userInfo" :rules="useraddRule">
          <el-form-item label="用户名" style="width: 250px" prop="username">
            <el-input :prefix-icon="User" v-model="userInfo.username" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密&nbsp;&nbsp;&nbsp;码" style="width: 250px" prop="password">
            <el-input :prefix-icon="Key" v-model="userInfo.password" clearable placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="名&nbsp;&nbsp;&nbsp;称" style="width: 250px" prop="display_name">
            <el-input :prefix-icon="User" v-model="userInfo.display_name" clearable placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="邮&nbsp;&nbsp;&nbsp;箱" style="width: 250px" prop="email">
            <el-input :prefix-icon="Box" v-model="userInfo.email" clearable placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手&nbsp;&nbsp;&nbsp;机" style="width: 250px" prop="phone">
            <el-input :prefix-icon="Iphone" v-model="userInfo.phone" clearable placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="类&nbsp;&nbsp;&nbsp;型" style="width: 250px" prop="role">
            <el-select v-model="userInfo.role" size="default">
              <el-option v-for="type in userTypes" :label="type.label" :value="type.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="form" v-else>
        <el-form :inline="true" size="default" ref="resetPasswordRef" :model="resetPassword" :rules="resetPasswordRule">
          <el-form-item label="用户名" style="width: 250px" prop="username">
            <el-input :disabled="true" :prefix-icon="User" v-model="resetPassword.username" clearable
                      placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="新密码" style="width: 250px" prop="password">
            <el-input :prefix-icon="Key" v-model="resetPassword.password" clearable
                      placeholder="请输入新密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button type="success" plain @click="submit">确认</el-button>
        <el-button type="primary" plain @click="visible">取消</el-button>
      </template>
    </el-dialog>
    <Table :columns="columns" :data="userList.items" :pagination="pagination" @list="getList">
      <template #ext>
        <el-form-item>
          <el-button plain type="primary" @click="addUser">添加用户</el-button>
        </el-form-item>
      </template>
      <template #table-ext>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="userScope">
            <el-button link type="primary" size="small" @click="changePassword(userScope.row)">
              重置密码
            </el-button>
            <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                title="是否删除"
                @confirm="deleteUser(userScope.row)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
    </Table>
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>