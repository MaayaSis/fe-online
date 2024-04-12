<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item v-for="item in menuList" :index="item.value" :key="item.value">
      {{ item.label }}
    </el-menu-item>
  </el-menu>

  <router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { ref } from 'vue'

const router = useRouter()
let activeIndex = ref("member")
const menuList = ref([
  {
    label: "成员管理",
    value: "member"
  },
  {
    label: "团队管理",
    value: "team"
  },
  {
    label: "职位维护",
    value: "position"
  }
]);

// 跳转所选 menu-item 对应的路由
const handleSelect = (index: string) => {
  activeIndex.value = index
  router.push({ name: index })
}
</script>