
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
        path: 'About',
        name: 'About',
        component: () => import('src/pages/front/AboutusPage.vue'),
        meta: {
          title: '關於我們',
          login: false,
          admin: false
        }
      },
      {
        path: 'Exhibitions',
        name: 'Exhibitions',
        component: () => import('src/pages/front/ExhibitionsPage.vue'),
        meta: {
          title: '展覽活動',
          login: false,
          admin: false
        }
      },
      {
        path: 'Member',
        name: 'Member',
        component: () => import('src/pages/front/MemberPage.vue'),
        meta: {
          title: '會員',
          login: true,
          admin: false
        }
      }
    ]
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import('src/layouts/AdminLayout.vue'),
    meta: {
      title: '後台管理',
      login: true,
      admin: true
    },
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('src/pages/admin/AdminPage.vue'),
        meta: {
          login: true,
          admin: true
        }
      },
      {
        path: '/members',
        name: 'Adminmembers',
        component: () => import('src/pages/admin/MemberPage.vue'),
        meta: {
          login: true,
          admin: true
        }
      },
      {
        path: '/orders',
        name: 'Adminorders',
        component: () => import('src/pages/admin/OrdersPage.vue'),
        meta: {
          login: true,
          admin: true
        }
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
