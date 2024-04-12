<template>
  <div class="flex">
    <org-tree></org-tree>
    <user-table></user-table>
  </div>
</template>

<script setup lang="ts" name="member">
import OrgTree from '@/components/OrgTree.vue';
import UserTable from '@/components/UserTable.vue';
</script>

<style lang="css" scoped>
.flex {
  display: flex;
}
</style>
