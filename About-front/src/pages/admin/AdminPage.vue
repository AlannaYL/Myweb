<template lang="pug">
#AdminPage
  q-layout(view="hHh lpR fFf")
    q-header.bg-white.text-black
      q-toolbar
        q-avatar
        q-toolbar-title 管理員後台
    q-drawer(show-if-above :width="240")
      q-scroll-area.fit
        ul
          li.q-pa-md(v-for="link in links")
            q-btn(:icon="link.icon" :to="link.to" push rounded color="blue") {{ link.text }}
    q-page-container
      q-page(padding)
        p(v-for=" n in 5") ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
        router-view
</template>
<script setup>
import { ref } from 'vue'

const links = [
  { icon: 'home', text: '返回首頁', to: '/' },
  { icon: 'feed', text: '展覽資訊', to: '/Admin/Add' },
  { icon: 'people', text: '會員管理', to: '/Admin/404' },
  { icon: 'reorder', text: '訂單管理', to: '/Admin/404' },
  { icon: 'dynamic_feed', text: '留言專區', to: '/Admin/404' }
]

</script>
