<template lang="pug">
#exhibitionsPage
  .row
    swiper.height(:modules="modules" :spaceBetween="1" :slidesPerView="'auto'" )
      swiper-slide(v-for="i in exhibitions")
        SwiperModal(v-bind="i")

</template>
<script setup>
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'
import { reactive } from 'vue'
import SwiperModal from 'src/components/SwiperModal.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const $q = useQuasar()

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
