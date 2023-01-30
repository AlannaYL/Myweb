<template lang="pug">
.q-pa-md
  q-carousel(v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated control-color="back" navigation padding arrows height="500px" class="shadow-2 rounded-borders")
    q-carousel-slide(:name="1" class="column no-wrap")
      .row.fit.justify-start.items-center.q-gutter-xs.q-col-gutter.no-wrap
        q-img.rounded-borders.col-4.full-height(src="https://cdn.quasar.dev/img/mountains.jpg")
        q-img.rounded-borders.col-4.full-height(src="https://cdn.quasar.dev/img/parallax1.jpg")
        q-img(class="rounded-borders col-4 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg")
</template>

<script setup>
import { ref } from 'vue'

const slide = ref(1)

</script>
