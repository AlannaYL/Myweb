<template lang="pug">
#MemberPage
q-layout(view="hHh lpR fFf")
  q-drawer.bg-color(show-if-above :width="240")
    q-scroll-area.fit
      ul.q-pl-xs.q-my-xl
        li.text-center
          h6 我的資訊
        li.firstli.q-mt-lg
          div(style="height: 150px")
            .bg-transparent
              q-avatar.q-mb-sm(size="56px")
                img(:src="avatar")
              p {{ account }}
              p(style="font-size: 16px") {{ email }}
        li.q-pa-md.text-center.column(v-for="link in links" )
          .col
            q-btn(:icon="link.icon" :to="link.to" flat rounded color="white") {{ link.text }}
  q-page-container
    q-page(padding)
      router-view
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/users'
const user = useUserStore()
const { account, email, avatar } = storeToRefs(user)
const links = [
  { icon: 'fa-solid fa-rotate-left', text: '返回首頁', to: '/' },
  { icon: 'shop', text: '去購物車', to: '/Mycart' },
  { icon: 'fa-solid fa-file', text: '我的訂單', to: '/Myorder' },
  { icon: 'fa-solid fa-bookmark', text: '我的收藏', to: '/Myfavorites' }
]
</script>
<style lang="scss">
.firstli {
  padding-left: 48px;
}
.bg-color {
  background: $blue;
}
</style>
