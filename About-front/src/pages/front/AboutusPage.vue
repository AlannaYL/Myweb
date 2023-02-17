<template lang="pug">
#aboutUs
  .centerlogo
    //- img(src="https://res.cloudinary.com/dhpu1tojv/image/upload/v1676604059/logo_3_m93mxg.svg")
    img(src="https://res.cloudinary.com/dhpu1tojv/image/upload/v1676604535/logo_2_nuvd66.svg")
  .about-info
    .row
      .onImage.col-4
        img(src="https://i.pinimg.com/originals/ac/8f/32/ac8f32655930269b2ee6dd91a1082bd4.jpg")
      .onInfo.col-8
        p {{ info.content }}
</template>
<script setup>
import { apiAuth } from 'src/boot/axios'
import { reactive } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const abouts = reactive([])

const info = reactive({
  content: '',
  images: [],
  delImages: [],
  description: ''
})

;(async () => {
  try {
    const { data } = await apiAuth.get('/abouts/')
    abouts.push(...data.result)
    info.content = abouts[0].content
    info.images = abouts[0].images
    info.delImages = []
    info.description = abouts[0].description
  } catch (error) {
    $q.notify({
      message: '取得失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()
</script>
