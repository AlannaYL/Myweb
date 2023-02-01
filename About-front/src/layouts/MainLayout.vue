
<template lang="pug">
#index
  q-layout.shadow-2(view='hHr lpR fFr' rounded-borders)
    q-header.bg-white.text-black(reveal)
      q-toolbar
        q-avatar
        q-toolbar-title 快樂100%
        .q-gutter-x-md
          q-btn(icon='face' @click="ShowLogin = true" push round color="white" text-color="black")
          q-btn(icon='search' push round color="white" text-color="black")
          q-btn(icon='menu' push round color="white" text-color="black")
    q-page-container
      q-page
        router-view
    q-dialog(v-model="ShowLogin")
      q-card#card.row.items-end
        .col-12
          RegisterModal(v-if="showRegister")
          LoginModal(v-if="!showRegister")
        .col-9.q-pl-lg.q-pb-sm {{ showRegister ? '已經是會員？' : '還不是會員？' }}
        q-btn.col-3(:label='showRegister ? "登入" : "註冊"' flat rounded color="pink" text-color="pink" @click="showRegister = !showRegister")
</template>

<script setup>
import { ref } from 'vue'
import RegisterModal from 'components/RegisterModal.vue'
import LoginModal from 'components/LoginModal.vue'

const ShowLogin = ref(false)
const showRegister = ref(false)

</script>
