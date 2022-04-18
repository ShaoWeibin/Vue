/**
 * 路由命名规范：路由全小写，以 - 分隔
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

/** 路由配置说明
{
  // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
  hidden: true // (默认 false)

  //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
  redirect: 'noRedirect'

  // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
  alwaysShow: true

  name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
  meta: {
    roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
    title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix: true // 如果设置为true，它则会固定在tags-view中(默认 false)

    // 当路由设置了该属性，则会高亮相对应的侧边栏。
    // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
    // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
    activeMenu: '/article/list'
  }
}
*/

// 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面
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
          // icon: '#icondashboard',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hidden: true,
    },
    component: () => import('@/views/user-manager/login/index.vue'),
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    name: '401',
    meta: {
      title: '401',
      hidden: true,
    },
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
  // 404 page must be placed at the end !!!
  { path: '/*', redirect: '/404' },
]

// 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/nested',
    component: Layout,
    redirect: 'noredirect',
    name: 'Nested',
    meta: {
      title: 'nested',
      icon: '#iconnested',
    },
    children: [
      {
        path: 'menu1',
        component: () => import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'),
        name: 'Menu1',
        meta: { title: 'menu1', noCache: true },
        children: [
          {
            path: 'menu1-1',
            component: () =>
              import(/* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: { title: 'menu1-1' },
          },
          {
            path: 'menu1-2',
            component: () =>
              import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
            name: 'Menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import(
                    /* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'
                  ),
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' },
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import(
                    /* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'
                  ),
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' },
              },
            ],
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
        name: 'Menu2',
        meta: { title: 'menu2' },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  {
    path: '/*',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,
})

export function resetRouter() {
  const newRouter = router
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
