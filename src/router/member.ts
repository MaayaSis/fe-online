import { RouteRecordRaw } from 'vue-router';

export const member: Array<RouteRecordRaw> = [
  {
    path: 'member',
    name: 'member',
    component: () => import("@/views/member/index.vue")
  }
]