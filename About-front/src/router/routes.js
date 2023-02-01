
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: {
          title: 'About',
          login: false,
          admin: false
        }
      },
      {
        path: 'Member',
        name: 'Member',
        component: () => import('src/pages/front/MemberPage.vue'),
        meta: {
          title: '會員服務',
          login: true,
          admin: false
        }
      },
      {
        path: 'About',
        name: 'About',
        component: () => import('src/pages/front/AboutPage.vue'),
        meta: {
          title: '關於我們',
          login: false,
          admin: false
        }
      },
      {
        path: 'Admin',
        name: 'Admin',
        component: () => import('src/pages/admin/AdminPage.vue'),
        meta: {
          title: '後台管理',
          login: true,
          admin: true
        },
        children: [
          {
            path: '/Add',
            name: 'Add',
            component: () => import('src/pages/admin/AddPage.vue'),
            meta: {
              login: true,
              admin: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: () => import('src/pages/MenuPage.vue'),
    meta: {
      title: '目錄',
      login: false,
      admin: false
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
