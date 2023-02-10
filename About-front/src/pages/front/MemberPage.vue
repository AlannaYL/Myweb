<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-drawer(show-if-above :width="240")
    q-scroll-area.fit
      ul.q-pl-xs.q-my-xl
        li.q-pa-md.text-center.column(v-for="link in links")
          .col
            q-btn(:icon="link.icon" :to="link.to" push rounded color="blue") {{ link.text }}
</template>
<script setup>
const links = [
  { icon: 'home', text: '返回首頁', to: '/' },
  { icon: 'shop', text: '我的收藏' }
]
</script>
