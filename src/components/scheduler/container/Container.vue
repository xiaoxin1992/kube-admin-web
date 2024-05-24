<script setup>
import {useItem} from "../../../store/index.js";
import {storeToRefs} from "pinia";
import {onBeforeMount, onMounted, onUpdated, reactive, ref, toRefs} from "vue";
import {ElMessage} from "element-plus";
import StringToList from "../../StringToList.vue";
import CNInput from "../../CNInput.vue";
import Ports from "./Ports.vue";
import HealthCheck from "./HealthCheck.vue";
import VolumeMounts from "./volumeMounts.vue";
import Env from "./Env.vue";

const props = defineProps({
  containerType: {
    type: String,
    default: "container",
  }
})
const {items} = storeToRefs(useItem())
const useItemer = useItem()
const editableTabsValue = ref(0)
const containerCount = ref(0)
const data = reactive({
  containers: []
})

onBeforeMount(() => {
  if (props.containerType === 'init') {
    data.containers = useItemer.item.spec.template.spec.initContainers
  } else {
    console.log(useItemer.item.spec.template.spec.containers)
    data.containers = useItemer.item.spec.template.spec.containers
    containerCount.value = data.containers.length
    if (containerCount.value === 0) {
      addHandleTabs()
    }
  }
})
const removeHandleTabs = (targetName) => {
  if (props.containerType === "container" && data.containers.length === 1) {
    ElMessage.warning("至少需要一个容器")
    return
  }
  if (targetName === editableTabsValue.value) {
    editableTabsValue.value = 0
  } else if (targetName < editableTabsValue.value) {
    editableTabsValue.value--
  }
  data.containers.splice(targetName, 1)
}
const addHandleTabs = () => {
  containerCount.value++
  data.containers.push({
    name: `${props.containerType}-${containerCount.value}`,
    image: "",
    imagePullPolicy: "Always",
    tty: false,
    workingDir: "",
    command: [],
    args: [],
    resources: {
      limits: {},
      requests: {}
    },
    ports: [],
    volumeMounts: [],
    env: [],
    envFrom: [],
  })
  editableTabsValue.value = data.containers.length - 1
}
const {containers} = toRefs(data)
const activeName = ref("basic")
const imagePullPolicyList = ref(["Always", "IfNotPresent", "Never"])
</script>

<template>
  <el-tabs
      v-model="editableTabsValue"
      addable
      closable
      @tabAdd="addHandleTabs"
      @tabRemove="removeHandleTabs"
  >
    <el-tab-pane
        v-for="(item, index) in containers"
        :key="index"
        :label="item.name"
        :name="index"
    >
      <el-tabs  v-model="activeName" tab-position="left" class="demo-tabs">
        <el-tab-pane label="常用配置" name="basic">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="容器名称" :prop="(props.containerType!='init'?'spec.template.spec.containers.'+index+'.name': 'spec.template.spec.initContainers.'+index+'.name')" required>
                <el-input v-model="item.name" placeholder="请输入容器名称" size="default"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="分配终端" prop="item.tty">
                <el-switch v-model="item.tty" size="default"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="工作目录" prop="item.workingDir">
                <el-input size="default" v-model="item.workingDir" placeholder="自定义工作目录"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18">
              {{item}}
              <el-form-item label="镜像地址" :prop="(props.containerType!='init'?'spec.template.spec.containers.'+index+'.image': 'spec.template.spec.initContainers.'+index+'.image')" required style="width: 100%">
                <el-input v-model="item.image" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="镜像拉取策略" style="width: 100%" prop="item.imagePullPolicy">
                <el-select v-model="item.imagePullPolicy">
                  <el-option v-for="imagePullPolicy in imagePullPolicyList" :key="imagePullPolicy" :label="imagePullPolicy" :value="imagePullPolicy"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="启动命令" prop="item.command" style="width: 100%">
                <StringToList v-model:data="item.command" placeholder="自定义启动命令，对应Entrypoint"></StringToList>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="启动参数" style="width: 100%" prop="item.args">
                <StringToList v-model:data="item.args" placeholder="自定义启动参数，对应cmd"></StringToList>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" title="容器最小申请内存, 对应requests.memory参数">
              <el-form-item label="最小内存" style="width: 100%">
                <CNInput placeholder="最小内存" v-model:data="item.resources.requests.memory" width="100%"></CNInput>
              </el-form-item>
            </el-col>
            <el-col :span="6" title="容器最大申请内存, 对应limits.memory参数">
              <el-form-item label="最小内存" style="width: 100%">
                <CNInput placeholder="最小内存" v-model:data="item.resources.limits.memory" width="100%"></CNInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最小CPU" style="width: 100%" title="容器最小申请CPU, 对应requests.cpu参数">
                <CNInput v-model:data="item.resources.requests.cpu"  placeholder="最小CPU" width="100%"></CNInput>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="最大CPU" style="width: 100%" title="容器最大申请CPU, 对应limits.CPU参数">
                <CNInput v-model:data="item.resources.limits.cpu" placeholder="最大CPU" width="100%"></CNInput>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane v-if="props.containerType !== 'init'" label="端口配置" name="ports">
          <Ports :ports="item.ports"></Ports>
        </el-tab-pane>
        <el-tab-pane v-if="props.containerType !== 'init'" label="健康检查" name="health">
          <HealthCheck :containerType="props.containerType" :container-index="index" :container="item"/>
        </el-tab-pane>
        <el-tab-pane label="存储配置" name="volume">
          <VolumeMounts :volumeMounts="item.volumeMounts"/>
        </el-tab-pane>
        <el-tab-pane label="环境变量" name="env">
          <Env :env="item.env" :envFrom="item.envFrom" />
        </el-tab-pane>
        <el-tab-pane v-if="props.containerType !== 'init'" label="生命周期" name="lifecycle">生命周期</el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">

</style>