<template>
  <div v-if="visible" class="container">
    <div>
      <el-breadcrumb class="title" separator="/">
        <el-breadcrumb-item v-for="item in orgList" :key="item.id">{{ item.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="nav">
      <el-input v-model="input" style="width: 240px" @input="handleSearch" size="large" placeholder="Please Input"
        :suffix-icon="Search" />
      <span class="ml10">
        <span>登录状态</span>
        <span>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </span>
      </span>
      <span class="ml10">{{ num }}个成员</span>
    </div>

    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="id" label="用户名" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/store/module/member';
import { computed, watch } from 'vue';
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const memberStore = useMemberStore()
const orgList = computed(() => memberStore.orgList)
const tableData = computed(() => memberStore.getterUserList)

const visible = ref(false)
const input = ref('')
const num = computed(() => tableData.value.length)

// 在未曾读取过部门的用户时, 隐藏当前页面; 但只要读取过一次后就不再隐藏
watch(
  tableData,
  (list) => {
    if (list.length > 0) visible.value = true
  },
  { once: true }
)

// 搜索防抖
let timer = ref(0)
const handleSearch = (query: string) => {
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    memberStore.handleUpdateQuery(query)
  }, 200)
}

</script>

<style lang="css" scoped>
.container {
  width: 100%;
}

.title {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
}

.nav {
  font-size: 14px;
}

.ml10 {
  margin-left: 10px;
}
</style>