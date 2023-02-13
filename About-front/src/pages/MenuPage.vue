<template lang="pug">
#Menu
  .q-toolbar.row.items-center.justify-end
  #Navigation
    #MenuLogo.col-3
      h1 挖系LOGO
    #MenuList.col-8
      .list
        .item
          li
            .space
            RouterLink(to="/") 首頁
        .item
          li
            RouterLink(to="/About") 關於
        .item
          li
            RouterLink(to="/Exhibitions") 展覽
        .item
          li
            RouterLink(v-if="isAdmin" to="/Admin") 管理
            RouterLink(v-else to="/Member") 會員
</template>

<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/stores/users'
const route = useRoute()

const user = useUserStore()
const { isAdmin } = storeToRefs(user)

</script>
