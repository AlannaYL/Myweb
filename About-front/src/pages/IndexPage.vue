<template lang="pug">
#Section_01
  swiper.height(:modules="modules" :spaceBetween="1" :slidesPerView="'auto'" )
    swiper-slide(v-for="i in exhibitions")
      SwiperModal(v-bind="i")
  q-btn.scorll-btn(outline color="pink" icon="fa-solid fa-arrow-down") list

</template>
<script setup>
import { reactive } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperModal from 'src/components/SwiperModal.vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const $q = useQuasar()

// const breakpoints = {
//   slidesPerView: 1,
//   spaceBetween: 10,
//   600: {
//     slidesPerView: 3,
//     spaceBetween: 10
//   },
//   1024: {
//     slidesPerView: 3,
//     spaceBetween: 10
//   }
// }

const exhibitions = reactive([]);

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
