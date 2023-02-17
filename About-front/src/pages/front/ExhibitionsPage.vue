<template lang="pug">
#exhibitionsPage
  .row.row-section
    .c0l-12
      h5 當期展覽
    .col-12
      swiper.height(:modules="modules" :spaceBetween="30" :slidesPerView="3" )
        swiper-slide(v-for="i in filterView()")
          SwiperModal(v-bind="i")
    .c0l-12
      h5 當期活動
    .col-12.q-my-lg
      swiper(:modules="modules" :spaceBetween="30" :slidesPerView="3")
        swiper-slide(v-for="i in filterCard()")
          CardModel(v-bind="i")

</template>
<script setup>
import { api, apiAuth } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from 'src/stores/users'
import { storeToRefs } from 'pinia'
import SwiperModal from 'components/SwiperModal.vue'
import CardModel from 'components/CardModel.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const route = useRoute()
const love = ref(false)
const $q = useQuasar()

const exhibitions = reactive([])
const filterView = () => {
  return exhibitions.filter(item => item.category === '展覽')
}
const filterCard = () => {
  return exhibitions.filter(item => item.category === '活動')
}

const user = useUserStore()
const { isLogin } = storeToRefs(user);

// const editLove = async () => {
//   try {
//     const { data } = await apiAuth.post('/users/love', { p_id: route.params.id, love: !love.value })
//     love.value = !love.value
//     if (love.value === true) {
//       $q.notify({
//         message: '加入收藏',
//         color: 'pink'
//       })
//     } else {
//       $q.notify({
//         message: '移除收藏',
//         color: 'pink'
//       })
//     }
//   } catch (error) {
//     $q.notify({
//       message: '失敗',
//       caption: error?.response?.data?.message || '發生錯誤',
//       color: 'pink'
//     })
//   }
// }

(async () => {
  try {
    const { data } = await api.get('/exhibitions')
    exhibitions.push(...data.result)
    if (isLogin.value) {
      const { data: loveData } = await apiAuth.get('/users/love')
      love.value = loveData.result
    }
  } catch (error) {
    $q.notify({
      message: '失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()
</script>
