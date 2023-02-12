<template lang="pug">
#exhibitionsPage
  .row.row-section
    .c0l-12
      h5 當期展覽
    .col-12
      swiper.height(:modules="modules" :spaceBetween="30" :slidesPerView="3" )
        swiper-slide(v-for="i in filterView()")
          SwiperModal(v-bind="i")
    .col-12.q-mt-lg
      swiper(:modules="modules" :spaceBetween="30" :slidesPerView="3")
        swiper-slide(v-for="i in filterCard()")
          CardModel(v-bind="i")

</template>
<script setup>
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import { reactive } from 'vue'
import SwiperModal from 'components/SwiperModal.vue'
import CardModel from 'components/CardModel.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const $q = useQuasar()

const exhibitions = reactive([])
const filterView = () => {
  return exhibitions.filter(item => item.category === '展覽')
}
const filterCard = () => {
  return exhibitions.filter(item => item.category === '活動')
}
;

(async () => {
  try {
    const { data } = await api.get('/exhibitions')
    exhibitions.push(...data.result)
  } catch (error) {
    $q.notify({
      message: '失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()
</script>
