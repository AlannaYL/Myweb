<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-drawer.bg-color(show-if-above :width="240")
    q-scroll-area.fit
      ul.q-pl-xs.q-my-xl
        li.q-pa-md.text-center.column(v-for="link in links")
          .col
            q-btn(:icon="link.icon" :to="link.to" push rounded color="blue") {{ link.text }}
</template>
<script setup>
const links = [
  { icon: 'fa-solid fa-rotate-left', text: '返回首頁', to: '/' },
  { icon: 'shop', text: '去購物車', to: '/Mycart' },
  { icon: 'fa-solid fa-file', text: '我的訂單' },
  { icon: 'fa-solid fa-bookmark', text: '我的收藏' }
]
</script>
<style lang="scss">
.bg-color {
  background: #FAF1E8;
}
</style>
