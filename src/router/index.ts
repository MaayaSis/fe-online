import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { member } from '@/router/member.ts';
import { team } from '@/router/team.ts';
import { position } from '@/router/position.ts';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/member',
    component: () => import("@/views/main.vue"),
    children: [
      ...member,
      ...team,
      ...position
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
