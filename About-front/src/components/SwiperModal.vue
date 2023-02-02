<template lang="pug">
swiper(class="height" :modules="modules" navigation :slides-per-view="3" :space-between="50" :pagination="{ clickable: true }" @swiper="onSwiper" @slideChange="onSlideChange")
  swiper-slide
    q-img(class="swipwe-img" src="https://placeimg.com/500/300/nature")
  swiper-slide
    q-img(class="swipwe-img" src="https://placeimg.com/500/300/nature")
  swiper-slide
    q-img(class="swipwe-img" src="https://placeimg.com/500/300/nature")
  swiper-slide
    q-img(class="swipwe-img" src="https://placeimg.com/500/300/nature")
  swiper-slide
    q-img(class="swipwe-img" src="https://placeimg.com/500/300/nature")
  swiper-slide
    q-img(class="swipwe-img" src="https://placeimg.com/500/300/nature")

</template>
<script setup>
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const onSwiper = (swiper) => {
  console.log(swiper)
}
const onSlideChange = () => {
  console.log('slide change')
}

const modules = [Navigation, Pagination, Scrollbar, A11y]

</script>
