<template lang="pug">
#AdminPage
  q-layout(view="hHh lpR fFf" container)
    q-header(elevated)
      q-toolbar
        q-btn
          q-avatar
            img(src="https://cdn.quasar.dev/img/boy-avatar.png")
        q-toolbar-title 管理員後台
    q-drawer(show-if-above bordered :width="240" bg-grey-2)
      q-scroll-area.fit
        q-list(padding)
          q-item(v-for="link in links" :to="link.to" v-ripple clickable)
            q-item-section(avatar)
              q-icon(:name="link.icon")
            q-item-section
              q-item-label {{ link.text }}
</template>
<script setup>
import { ref } from 'vue'

const links = [
  { icon: 'fa-solid fa-house', text: '回首頁', to: '/' },
  { icon: 'fa-solid fa-file', text: '展覽資訊', to: '/Admin/Add' },
  { icon: 'fa-solid fa-users', text: '會員管理', to: '' },
  { icon: '', text: '訂單管理', to: '' },
  { icon: '', text: '留言', to: '' }
]
</script>
