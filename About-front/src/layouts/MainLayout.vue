
<template lang="pug">
#index
  q-layout(view='hHr lpR fFr' rounded-borders)
    q-header.bg-white.text-black(reveal)
      q-toolbar
        RouterLink#logo(to="/")
          //- img(src="https://res.cloudinary.com/dhpu1tojv/image/upload/v1676604535/logo_2_nuvd66.svg")
          img(src="https://res.cloudinary.com/dhpu1tojv/image/upload/v1676604059/logo_3_m93mxg.svg")
        //- q-toolbar-title 我不可愛
        q-space
        .q-gutter-x-md
          q-btn(v-if="isLogin" @click="logout" icon='fa-solid fa-person-through-window' push round color="white" text-color="black")
          q-btn(v-if="!isAdmin" to="/Mycart" icon='fa-solid fa-cart-shopping' push round color="white" text-color="black")
            q-badge(:label="cart" rounded floating color="pink")
          q-btn(v-if="isLogin && isAdmin" to="/Admin" icon='fa-solid fa-eye' @click="ShowLogin = true" push round color="white" text-color="black")
          q-btn(v-if="!isLogin" icon='face' @click="ShowLogin = true" push round color="white" text-color="black")
          q-btn(to="/Menu" icon='fa-solid fa-bars' push round color="white" text-color="black")
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
const { isLogin, isAdmin, ShowLogin, cart } = storeToRefs(user)
const { logout } = user
</script>

<style lang="sass">
#logo
  width: 200px
  height: 50px
  img
    width: 100%
    object-fit: contain
</style>
