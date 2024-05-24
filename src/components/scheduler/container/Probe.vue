<script setup>
import {markRaw, reactive, ref, toRefs} from "vue";
import Exec from "./action/Exec.vue";
import HttpGet from "./action/HttpGet.vue";
import TcpSocket from "./action/TcpSocket.vue";
import Grpc from "./action/Grpc.vue";

const props = defineProps({
  probeType: {
    type: String,
    default: "startupProbe"
  },
  containerType: {
    type: String
  },
  containerIndex: {
    type: Number
  },
  title: {
    type: String,
    default: "启动探针"
  },
  probe: {
    type: Object
  }
})
let probeBasicConfig = reactive({
  initialDelaySeconds: 30,
  periodSeconds: 30,
  timeoutSeconds: 1,
  failureThreshold: 2,
  successThreshold: 1,
})
const data = reactive({
  options: {
    probeHandlers: [
      {
        label: "关闭",
        value: "close"
      },
      {
        label: "Exec",
        value: "exec"
      },
      {
        label: "Http",
        value: "httpGet"
      },
      {
        label: "Socket",
        value: "tcpSocket"
      },
      {
        label: "Grpc",
        value: "grpc"
      }
    ],
    probeConfig: {
      exec: {
        command: [],
      },
      httpGet: {
        host: "",
        httpHeaders: [],
        path: "/",
        port: 8080,
        scheme: "HTTP"
      },
      tcpSocket: {
        host: "",
        port: 8080
      },
      grpc: {
        service: "",
        port: 8080
      }
    },
    probeActionComp: {
      'exec': markRaw(Exec),
      'httpGet':  markRaw(HttpGet),
      'tcpSocket':  markRaw(TcpSocket),
      'grpc':  markRaw(Grpc),
    },
  },
  action: "close"
})
const emits = defineEmits(['probeChangeRollBack'])
const probeChanged = () => {
  if (probeBasicConfig.hasOwnProperty('exec')) {
    Reflect.deleteProperty(probeBasicConfig, "exec")
  }
  if (probeBasicConfig.hasOwnProperty('httpGet')) {
    Reflect.deleteProperty(probeBasicConfig, "httpGet")
  }
  if (probeBasicConfig.hasOwnProperty('tcpSocket')) {
    Reflect.deleteProperty(probeBasicConfig, "tcpSocket")
  }
  if (probeBasicConfig.hasOwnProperty('grpc')) {
    Reflect.deleteProperty(probeBasicConfig, "grpc")
  }
  if (data.action === 'close') {
    emits('probeChangeRollBack', {})
  }else{
    probeBasicConfig[data.action] = data.options.probeConfig[data.action]
    emits('probeChangeRollBack', probeBasicConfig)
  }
}
const {options} = toRefs(data)
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="body">
        <el-row style="width: 100%" :gutter="20">
          <el-col :span="10">
            <div style="width: 100%">
              <span>{{ props.title }}</span>
            </div>
          </el-col>
          <el-col :span="10">
            <el-select v-model="data.action" @change="probeChanged()">
              <el-option v-for="option in options.probeHandlers" :label="option.label"
                         :value="option.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </template>
    <div>
      <div v-show="data.action !== 'close'">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="延迟检查" style="margin-bottom: 0">
              <el-input-number v-model="probeBasicConfig.initialDelaySeconds"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检查间隔" style="margin-bottom: 0">
              <el-input-number v-model="probeBasicConfig.periodSeconds"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="超时时间" style="margin-bottom: 0">
              <el-input-number v-model="probeBasicConfig.timeoutSeconds"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px">
          <el-col :span="8">
            <el-form-item label="失败次数" style="margin-bottom: 0">
              <el-input-number v-model="probeBasicConfig.failureThreshold"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成功次数" style="margin-bottom: 0">
              <el-input-number v-model="probeBasicConfig.successThreshold"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 10px">
        <div v-if="data.action !== 'close'">
          <component :containerType="props.containerType" :containerIndex="props.containerIndex" :probeType="props.probeType" :probeConfig="probeBasicConfig" :is="options.probeActionComp[data.action]"></component>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.body {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>