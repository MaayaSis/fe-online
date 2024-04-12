<template>
  <div class="container">
    <div class="title">
      <div>部门</div>
      <div>
        <el-icon>
          <Plus />
        </el-icon>
      </div>
    </div>
    <el-tree style="min-width: 300px;max-width: 600px" :data="treeList" :props="props"
      @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Org } from '@/types/api';
import orgApi from '@/api/org';
import { useMemberStore } from '@/store/module/member';

const treeList = ref<Org[]>([])
const props = {
  value: 'id',
  label: 'name',
  children: 'children'
}
const memberStore = useMemberStore()
orgApi.query().then(res => {
  treeList.value = res
  /* 
   1. 一般真实开发场景中部门树的数据量并不大,接口可以一次性返回所有
   2. 当前接口未返回二级部门,三级部门...
   3. 因此以下代码模拟出了接口有返回此级部门的场景
   */
  treeList.value = res.map((item, index) => {
    return {
      ...item,
      children: index > 0 && index % 2 === 0 ? [res[index - 1]] : []
    }
  })
})


// 仅最底层级节点才能获取部门人数信息
const handleNodeClick = (org: Org, node: any) => {
  if (node.childNodes.length === 0) {
    memberStore.handleSelectedOrg(org, node)
  }

}
</script>

<style lang="css" scoped>
.container {
  padding-right: 20px;
}

.title {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
}
</style>