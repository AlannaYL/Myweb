<template lang="pug">
#AdminPage
  q-layout(view="hHh lpR fFf")
    q-drawer(show-if-above :width="240")
      q-scroll-area.fit.bg-color
        .row
          .col-12.q-pa-xxl.text-center.column(v-for="link in links")
            q-btn(:disable="link.to === route.path" :icon="link.icon" :to="link.to" flat rounded color="white") {{ link.text }}
    q-page-container
      q-page(padding)
        router-view
</template>image.png
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/users'
import routes from 'src/router/routes'
import { useRoute } from 'vue-router'

const links = [
  { icon: 'fa-solid fa-rotate-left', text: '返回首頁', to: '/' },
  { icon: 'fa-solid fa-file-lines', text: '展覽管理', to: '/Admin' },
  { icon: 'fa-solid fa-users', text: '會員管理', to: '/Adminmembers' },
  { icon: 'fa-solid fa-list', text: '訂單管理', to: '/orders' },
  { icon: 'fa-regular fa-comment', text: '關於我們', to: '/Adminabout' }
]

const user = useUserStore()
const { avatar } = storeToRefs(user)

const linksFiltered = computed(() => {
  return links.filter(link => routes.path !== link.to)
})

const route = useRoute()
</script>
