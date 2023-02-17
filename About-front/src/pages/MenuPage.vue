<template lang="pug">
#Menu
  .q-toolbar.row.items-center.justify-end
  #Navigation
    #MenuLogo.col-4
      RouterLink(to="/")
        img(src="https://res.cloudinary.com/dhpu1tojv/image/upload/v1676604059/logo_3_m93mxg.svg")
        //- img(src="https://res.cloudinary.com/dhpu1tojv/image/upload/v1676604535/logo_2_nuvd66.svg")
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
