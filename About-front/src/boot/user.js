import router from '../router/routes.js'
import pinia from '../stores/index.js'
import { useUserStore } from '../stores/users.js'

export async function registerPlugins (app) {
  app.use(pinia)
  await useUserStore().getUser()
  app.use(router)
}

import App from '../App.vue'

// Composables
import { createApp } from 'vue'

// 立刻執行function
(async () => {
  const app = createApp(App)
  await registerPlugins(app)
  app.mount('#app')
})()
