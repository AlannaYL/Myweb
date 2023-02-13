<template lang="pug">
#AdminPage
  q-layout(view="hHh lpR fFf")
    q-drawer(show-if-above :width="240")
      q-scroll-area.fit.bg-color
        .row
          .col-12.q-pa-xxl.text-center.column(v-for="link in links" )
            q-btn(:disable="link.to === route.path" :icon="link.icon" :to="link.to" push rounded color="blue") {{ link.text }}
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
  { icon: 'home', text: '返回首頁', to: '/' },
  { icon: 'home', text: '展覽管理', to: '/Admin' },
  { icon: 'people', text: '會員管理', to: '/Adminmembers' },
  { icon: 'reorder', text: '訂單管理', to: '/orders' },
  { icon: 'dynamic_feed', text: '留言專區', to: '/texts' }
]

const user = useUserStore()
const { avatar } = storeToRefs(user)

const linksFiltered = computed(() => {
  return links.filter(link => routes.path !== link.to)
})

const route = useRoute()
</script>
