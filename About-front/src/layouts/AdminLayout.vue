<template lang="pug">
#AdminPage
  q-layout(view="hHh lpR fFf")
    q-drawer(show-if-above :width="240")
      q-scroll-area.fit
        ul.q-pl-xs.q-my-xl
          li.q-pa-md.text-center(v-for="link in links" v-if="link.condition")
            q-btn(v-if="$route.path !== link.to" :icon="link.icon" :to="link.to" push rounded color="blue") {{ link.text }}
    q-page-container
      q-page(padding)
        router-view
</template>image.png
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/users'

const links = [
  { icon: 'home', text: '返回首頁', to: '/', condition: true },
  { icon: 'home', text: '展覽管理', to: '/Admin', condition: true },
  { icon: 'people', text: '會員管理', to: '/members', condition: true },
  { icon: 'reorder', text: '訂單管理', to: '/Admin/orders', condition: true },
  { icon: 'dynamic_feed', text: '留言專區', to: '/Admin/texts', condition: true }
]

const user = useUserStore()
const { avatar } = storeToRefs(user)

</script>
