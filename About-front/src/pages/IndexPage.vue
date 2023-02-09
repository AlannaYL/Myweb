<template lang="pug">
#Section_01
  swiper.height(:modules="modules" navigation  :breakpoints="breakpoints")
    swiper-slide(v-for="i in exhibitions" style="width: 500px")
      SwiperModal(v-bind="i")

</template>
<script setup>
import { reactive } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperModal from 'src/components/SwiperModal.vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const $q = useQuasar()
const modules = reactive([Navigation, Pagination])

const breakpoints = {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 10,
  pagination: {
    clickable: true
  },
  600: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 20
  },
  1024: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20
  }
}

const exhibitions = reactive([]);

(async () => {
  try {
    const { data } = await api.get('/exhibitions')
    exhibitions.push(...data.result)
    console.log(exhibitions)
  } catch (error) {
    $q.notify({
      message: '失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()
</script>

<style lang="sass">
.swiper-slide:nth-of-type(odd)
  .swiper-section::before
    background: red
</style>
