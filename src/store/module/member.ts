import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import userApi from '@/api/user'
import { Org, OrgNode, User } from '@/types/api'

export const useMemberStore = defineStore('Member', () => {
  // 当前被选中的最底层 Org Tree 节点
  const selectedOrg = ref<Org>({
    id: '',
    name: ''
  })
  // 所有被选中的 Org Tree
  const orgList = ref<Org[]>([])
  // 当前部门的所有用户
  let userList = ref<User[]>([])

  let timerSelect = ref(0)
  function handleSelectedOrg(org: Org, node: OrgNode) {
    // 防抖: 重复点击当前部门不再获取
    if (org !== selectedOrg.value) {
      clearTimeout(timerSelect.value)
      setTimeout(() => {
        selectedOrg.value = org
        orgList.value = []
        orgList.value.unshift(org)

        // 递归获取当前子节点之上的所有被选中的父节点 Org 对象
        function getParentOrg(node: OrgNode) {
          if (node.parent && node.parent.label) {
            const { id, name } = node.parent.data
            orgList.value.unshift({ id, name })
            getParentOrg(node.parent)
          }
        }
        getParentOrg(node)

        // 以当前的最底层 Org Tree 节点获取该部门的 UserList
        userApi.query({ orgId: org.id }).then(res => {
          userList.value = res.map(item => {
            return {
              ...item,
              checked: false
            }
          })
        })
      }, 200);
    }
  }

  const query = ref('')
  function handleUpdateQuery(value: string) {
    query.value = value
  }

  const getterUserList = computed(() => {
    if (query) {
      return userList.value.filter(item => {
        return item.name.toLocaleLowerCase().includes(query.value.toLowerCase())
      })
    } else {
      return userList.value
    }
  })

  return {
    orgList,
    userList,
    handleSelectedOrg,
    handleUpdateQuery,
    getterUserList
  }
})
