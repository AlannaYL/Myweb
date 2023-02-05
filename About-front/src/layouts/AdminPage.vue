<template lang="pug">
#AdminPage
  q-layout(view="hHh lpR fFf")
    q-drawer(show-if-above :width="240")
      q-scroll-area.fit
        ul.q-pl-xs
          li.q-pa-md
            q-avatar
              img(:src="avatar")
            label.q-pl-md {{ account }}
          q-separator
          li.q-pa-md.text-center(v-for="link in links")
            q-btn(:icon="link.icon" :to="link.to" push rounded color="blue") {{ link.text }}
    q-page-container
      q-page(padding)
        p(v-for=" n in 5") ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
        router-view
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/users'

const links = [
  { icon: 'home', text: '返回首頁', to: '/' },
  { icon: 'feed', text: '展覽資訊', to: '/Admin/Add' },
  { icon: 'people', text: '會員管理', to: '/Admin/404' },
  { icon: 'reorder', text: '訂單管理', to: '/Admin/404' },
  { icon: 'dynamic_feed', text: '留言專區', to: '/Admin/404' }
]

const user = useUserStore()
const { avatar, account } = storeToRefs(user)

</script>
