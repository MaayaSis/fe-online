import { RouteRecordRaw } from 'vue-router';

export const position: Array<RouteRecordRaw> = [
  {
    path: 'position',
    name: 'position',
    component: () => import("@/views/position/index.vue")
  }
]