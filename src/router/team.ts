import { RouteRecordRaw } from 'vue-router';

export const team: Array<RouteRecordRaw> = [
  {
    path: 'team',
    name: 'team',
    component: () => import("@/views/team/index.vue")
  }
]