// Just a mock data

export const constantRoutes = [
  {
    path: '/redirect',
    component: 'Layout',
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: 'views/redirect/index',
      },
    ],
  },
  {
    path: '/login',
    component: 'views/login/index',
    meta: { hidden: true },
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    meta: { hidden: true },
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    meta: { hidden: true },
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    meta: { hidden: true },
  },
  {
    path: '',
    component: 'Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true,
        },
      },
    ],
  },
]

export const asyncRoutes = [
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true },
  },
]
