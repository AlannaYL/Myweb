<template lang="pug">
swiper.height(:modules="modules" navigation  :breakpoints="breakpoints" @swiper="onSwiper" @slideChange="onSlideChange")
  swiper-slide(v-for="(slide, index) in slides" :key="index")
    .container
      q-img.swipwe-img(:src="slide.img")

</template>
<script setup>
import { Navigation, Pagination } from 'swiper'
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

const slides = [
  { img: 'https://placeimg.com/500/600/nature' },
  { img: 'https://placeimg.com/500/600/nature' },
  { img: 'https://placeimg.com/500/600/nature' },
  { img: 'https://placeimg.com/500/600/nature' },
  { img: 'https://placeimg.com/500/600/nature' },
  { img: 'https://placeimg.com/500/600/nature' }
]

const modules = [Navigation, Pagination]

</script>
