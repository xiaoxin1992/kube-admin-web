<script setup>
import {onBeforeMount, reactive, ref, toRefs} from "vue";
import {storeToRefs} from "pinia";
import {useItem} from "../../../../store/index.js";
import {getSecrets} from "../../../../api/secret.js";

const useItemer = storeToRefs(useItem())
const props = defineProps({
  envFrom: {
    type: Array
  },
  envFromItem: {
    type: Object,
    default: {},
    required: false
  },
  method: {
    type: String,
    default: "Create"
  }
})
const emits = defineEmits(["close"])
const data = reactive({
  items: [],
  envFromItem: {
    prefix: "",
    secretRef: {
      name: "",
    }
  }
})
onBeforeMount(()=>{
  if (props.method !== "Create") {
    data.envFromItem = props.envFromItem
  }
})
const getVisibleChange =  (visible) => {
  if (!visible) {
    return
  }
  getSecrets({page: 1, size: 10000, cluster:useItemer.cluster.value, namespace: useItemer.namespace.value}).then((response) => {
    const {secrets} = response.data
    data.items = secrets
  })
}
const submit = () => {
  props.envFrom.unshift(JSON.parse(JSON.stringify(data.envFromItem)))
  emits("close")
}
const {items} = toRefs(data)
const envFromItemRef = ref()
</script>

<template>
  <el-form inline v-model="data.envFromItem" ref="envFromItemRef">
    <el-row>
      <el-form-item label="变量前缀" prop="prefix">
        <el-input v-model="data.envFromItem.prefix" placeholder="请输入变量前缀" />
      </el-form-item>
      <el-form-item label="选择Secrets" prop="secretRef.name" style="width: 300px" >
        <el-select @visibleChange="getVisibleChange" v-model="data.envFromItem.configMapRef.name" placeholder="请选择Secrets" style="width: 180px">
          <el-option v-for="iTem in items" :key="iTem.metadata.name" :value="iTem.metadata.name" :label="iTem.metadata.name"></el-option>
        </el-select>
      </el-form-item>
    </el-row>
    <el-row>
      <el-button v-if="props.method=='Create'" type="primary" size="default" @click="submit()">添加</el-button>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>