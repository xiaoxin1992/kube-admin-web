<script setup>

import {computed, reactive, ref, toRefs} from "vue";
import CNFrame from "./CNFrame.vue";
import {getSecrets} from "../api/secret.js";
import CNInput from "./CNInput.vue";
import Labels from "./Labels.vue";
import {list2Object} from "../utils/tools.js";

import {useItem} from "../store/index.js";
import {storeToRefs}  from  'pinia'
import SchedulerConfig from "./scheduler/schedulerConfig.vue";
import Volume from "./scheduler/Volume.vue";

const props = defineProps({
  resourceType: {
    type: String,
    default: "Deployment"
  },
  method: {
    type: String,
    default: "Create"
  }
})

const labelActiveName = ref("controlAnnot")

const formConfig = reactive({
  cluster: "",
  namespace: "",
  dnsPolicyOptions: ["ClusterFirst", "Default", "ClusterFirstWithHostNet", "None"],
  imagePullSecrets: [],
  // 配置标签或注释
  autoCreateLabel: true,
  // 绑定service
  autoCreateService: false,
  options: {
    controlAnnotList: [],
    controlLabelList: [],
    podLabelList: [],
    podAnnotList: [],
    nodeSelectorList: [],
  }
})

const itemRef = ref()
const activeName = ref("basic")
const clusterNamespace = (obj) => {
  formConfig.cluster = obj.cluster
  formConfig.namespace = obj.namespace
  useItemer.cluster = obj.cluster
  useItemer.namespace = obj.namespace
  getImagePullSecrets()
}
const getImagePullSecrets = () => {
  if (formConfig.cluster === '' || formConfig.namespace === '') {
    formConfig.imagePullSecrets = []
    useItemer.item.spec.template.spec.imagePullSecrets = []
    return
  }
  getSecrets({page: 1, size: 1000, namespace: formConfig.namespace, cluster: formConfig.cluster}).then(response => {
    const {secrets} = response.data
    secrets.forEach(item => {
      if (item.type === "kubernetes.io/dockerconfigjson") {
        formConfig.imagePullSecrets.push({
          name: item.metadata.name
        })
      }
    })
  })
}

const getStrategyType = computed(() => {
  if (props.resourceType === "Deployment") {
    return [
      {
        value: "RollingUpdate",
        label: "滚动更新",
      },
      {
        value: "Recreate",
        label: "删除重建",
      }
    ]
  }
})

const strategyChange = (value) => {
  if (value === "Recreate") {
    delete useItemer.item.spec.strategy.rollingUpdate
  } else {
    useItemer.item.spec.strategy.rollingUpdate = {
      maxSurge: "25%",
      maxUnavailable: "25%"
    }
  }
}
const makeYaml = () => {

}
const submit = () => {
  // list转换层obj
  let labelObj = {}
  if (formConfig.autoCreateLabel) {
    labelObj = {app: useItemer.item.metadata.name}
    useItemer.item.metadata.labels = labelObj
    useItemer.item.spec.selector.matchLabels = labelObj
    useItemer.item.spec.template.metadata.labels = labelObj
  } else {
    const controlLabelList = list2Object(options.value.controlLabelList)
    const controlAnnotList = list2Object(options.value.controlAnnotList)
    const podAnnotList = list2Object(options.value.podAnnotList)
    const podLabelList = list2Object(options.value.podLabelList)
    useItemer.item.metadata.labels = controlLabelList
    useItemer.item.spec.selector.matchLabels = podLabelList
    useItemer.item.spec.template.metadata.labels = podLabelList
    useItemer.item.metadata.annotations = controlAnnotList
    useItemer.item.spec.template.metadata.annotations = podAnnotList
  }
  if (options.value.nodeSelectorList.length !== 0) {
    useItemer.item.spec.template.spec.nodeSelector = list2Object(options.value.nodeSelectorList)
  }
  console.log(useItemer.item)
}
const useItemer = useItem()
const {options} = toRefs(formConfig)
const {item} = storeToRefs(useItem())
</script>

<template>
  <el-form :model="item"
           ref="itemRef"
           :inline="true" size="default"
  >
    <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
      <el-tab-pane label="基本配置" name="basic">
        <el-card style="max-width: 100%" shadow="never">
          <template #header>
            <div>
              <CNFrame @change="clusterNamespace"/>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="名称" prop="metadata.name" required>
                <el-input style="width: 180px" v-model.trim="item.metadata.name" clearable placeholder="请输入名称 "/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="副本数量" prop="spec.replicas" required>
                <el-input-number style="width: 180px" v-model.trim.number="item.spec.replicas" :min="1" :max="100"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="镜像仓库密钥" prop="spec.template.spec.imagePullSecrets">
                <el-select multiple style="width: 180px" value-key="name" placeholder="请选择镜像密钥"
                           v-model="item.spec.template.spec.imagePullSecrets">
                  <el-option
                      v-for="item in formConfig.imagePullSecrets"
                      :key="item.name" :label="item.name"
                      :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="DNS策略" prop="spec.template.spec.dnsPolicy">
                <el-select style="width: 180px" placeholder="请选择DNS策略"
                           v-model="item.spec.template.spec.dnsPolicy">
                  <el-option
                      v-for="item in formConfig.dnsPolicyOptions"
                      :key="item" :label="item"
                      :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="更新方式" prop="spec.strategy.type">
                <el-select style="width: 180px" placeholder="请选择更新方式"
                           v-model="item.spec.strategy.type" @change="strategyChange">
                  <el-option
                      v-for="item in getStrategyType"
                      :key="item.value" :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div v-if="item.spec.strategy.type==='RollingUpdate'">
                <el-form-item label="最大不可用" prop="spec.strategy.rollingUpdate.maxUnavailable">
                  <CNInput v-model:data="item.spec.strategy.rollingUpdate.maxUnavailable"/>
                </el-form-item>
                <el-form-item label="可超得最大值" prop="spec.strategy.rollingUpdate.maxSurge">
                  <CNInput v-model:data="item.spec.strategy.rollingUpdate.maxSurge"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <el-form-item label="使用宿主机网络" prop="spec.template.spec.hostNetwork">
                <el-switch
                    v-model="item.spec.template.spec.hostNetwork"
                    style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"
                    inactive-text="关闭"
                    active-text="开启"
                    inline-prompt
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <!--标签配置-->
              <el-form-item label="标签以注释">
                <el-radio-group v-model="formConfig.autoCreateLabel">
                  <el-radio :value="true" size="default">自动生成</el-radio>
                  <el-radio :value="false" size="default">手动配置</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!--自动添加service-->
              <el-form-item label="自动添加service">
                <el-switch v-model="formConfig.autoCreateService"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        <el-card v-if="!formConfig.autoCreateLabel" style="max-width: 100%" shadow="never">
          <el-tabs tab-position="left" v-model="labelActiveName">
            <el-tab-pane label="控制器注释" name="controlAnnot">
              <Labels :list="options.controlAnnotList"></Labels>
            </el-tab-pane>
            <el-tab-pane label="控制器标签" name="controlLabels">
              <Labels :list="options.controlLabelList"></Labels>
            </el-tab-pane>
            <el-tab-pane label="Pod注释" name="PodAnnot">
              <Labels :list="options.podAnnotList"></Labels>
            </el-tab-pane>
            <el-tab-pane label="Pod标签" name="PodLabels">
              <Labels :list="options.podLabelList"></Labels>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="调度配置" name="affinity">
        <schedulerConfig :list="options.nodeSelectorList" />
      </el-tab-pane >
      <el-tab-pane label="存储卷配置" name="volume">
        <Volume></Volume>
      </el-tab-pane>
      <el-tab-pane label="容器配置" name="container">Role</el-tab-pane>
      <el-tab-pane label="初始化容器" name="int-container">Task</el-tab-pane>
      <div style="display: flex; justify-content: center;margin-top: 20px">
        <el-form-item>
          <el-button plain @click="makeYaml">生成Yaml</el-button>
          <el-button type="primary" @click="submit" plain>
            {{ props.method === "Create" ? "创建" : "更新" }}
          </el-button>
        </el-form-item>
      </div>
    </el-tabs>
  </el-form>
</template>

<style scoped lang="scss">
.box {
  width: 100%;
  border-bottom: 1px solid var(--el-border-color);
}
</style>