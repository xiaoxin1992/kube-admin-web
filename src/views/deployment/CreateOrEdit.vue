<script setup>

import ReFrame from "../../components/ReFrame.vue";
import {useItem, userStore} from "../../store/index.js";
import {createDeployment, getDeploymentDetail, updateDeployment} from "../../api/deployment.js";
import {ElMessage} from "element-plus";
import YamlShow from "../../components/YamlShow.vue";
import {onBeforeMount, ref} from "vue";
import {obj2Yaml} from "../../utils/tools.js";
import {useRoute} from "vue-router";
const useItemer = useItem()
const showDetail = ref(false)
const props = defineProps({
  method: {
    type: String,
    default: "Create"
  }
})

let yamlContent = ref("")
const submit = (tag) => {
  useItemer.item['apiVersion'] = 'apps/v1'
  useItemer.item['Kind'] = 'Deployment'
  console.log("tag", tag, useItemer.item)
  const postData = {
    zone: useItemer.cluster,
    deployment: {
      apiVersion: "apps/v1",
      Kind: "Deployment",
      metadata: {
        namespace: useItemer.namespace,
        name: useItemer.item.metadata.name,
        labels: useItemer.item.metadata.labels,
        annotations: useItemer.item.metadata.annotations
      },
      spec: useItemer.item.spec
    },
  }
  if (tag === 'yaml') {
    yamlContent.value = obj2Yaml(JSON.parse(JSON.stringify(postData.deployment)))
    showDetail.value = true
    return
  }
  if (props.method !== 'update') {
    createDeployment(postData).then((res)=>{
      const {message} = res
      ElMessage.success(message)
    })
  }else{
    updateDeployment(postData).then((res)=>{
      const {message} = res
      ElMessage.success(message)
    })
  }
}
const route = useRoute()
async function detail() {
  const query = route.query
  await getDeploymentDetail(query).then((res)=> {
    const {data}  = res
    console.log(data.deployment)
    useItemer.cluster = query.cluster
    useItemer.namespace = query.namespace
    useItemer.item = JSON.parse(JSON.stringify(data.deployment))
  })
}

onBeforeMount(()=>{
  detail()
})
</script>

<template>
  <ReFrame @submit="submit" :method="props.method"></ReFrame>
  <YamlShow
      :yaml-content="yamlContent"
      :show="showDetail"
      @close="(val) => {showDetail = val}"
  />
</template>

<style scoped lang="scss">

</style>