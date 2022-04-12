import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/Index.vue';
import HomeView from '../views/dashboard/HomeView.vue';

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: '#icondashboard',
          affix: true,
        },
      },
      {
        path: '401',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/error-page/401.vue'),
        name: '401',
        meta: {
          title: '401',
          icon: '',
          affix: true,
        },
      },
      {
        path: '404',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/error-page/404.vue'),
        name: '404',
        meta: {
          title: '404',
          icon: '',
          affix: true,
        },
      },
    ],
  },
];

export const asyncRoutes: Array<RouteRecordRaw> = [];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,
});

export function resetRouter() {
  const newRouter = router;
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
