<template lang="pug">
#AdminPage
  q-layout(view="hHh lpR fFf")
    q-drawer(show-if-above :width="240")
      q-scroll-area.fit
        ul.q-pl-xs.q-my-xl
          li.q-pa-md.text-center.column(v-for="link in links")
            .col
              q-btn(:icon="link.icon" :to="link.to" push rounded color="blue") {{ link.text }}
    q-page-container
      q-page(padding)
        router-view
</template>image.png
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/users'
import routes from 'src/router/routes'

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
</script>
