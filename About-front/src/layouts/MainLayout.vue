
<template lang="pug">
#index
  q-layout.shadow-2(view='hHr lpR fFr' rounded-borders)
    q-header.bg-white.text-black(reveal)
      q-toolbar
        q-avatar
        q-toolbar-title 我不可愛
        .q-gutter-x-md
          q-btn(v-if="isLogin" @click="logout" icon='fa-solid fa-person-through-window' push round color="white" text-color="black")
          q-btn(v-if="!isLogin" icon='face' @click="ShowLogin = true" push round color="white" text-color="black")
          q-btn(icon='search' push round color="white" text-color="black")
          q-btn(icon='menu' push round color="white" text-color="black")
    q-page-container
      q-page
        router-view
    q-dialog(v-if="!isLogin" v-model="ShowLogin")
      q-card#card.row.items-end
        .col-12
          RegisterModal(v-if="showRegister")
          LoginModal(v-if="!showRegister")
        .col-9.q-pl-lg.q-pb-sm {{ showRegister ? '已經是會員？' : '還不是會員？' }}
        q-btn.col-3(:label='showRegister ? "登入" : "註冊"' flat rounded color="pink" text-color="pink" @click="showRegister = !showRegister")
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/users'
import RegisterModal from 'components/RegisterModal.vue'
import LoginModal from 'components/LoginModal.vue'

const showRegister = ref(false)

const user = useUserStore()
const { isLogin, isAdmin, ShowLogin } = storeToRefs(user)
const { logout } = user

</script>
