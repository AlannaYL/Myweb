<template lang="pug">
#ExhibitionView.q-mb-xl
  .img-section.col-12
    img.img-width(:src="exhibitions.image")
  .text-section.co-12
    h1.col-12 {{ exhibitions.title }}
    p.q-mt-xl.q-ml-xl.text-p {{ exhibitions.from + '' + '~' + '' + exhibitions.to }}
      .text-right
        q-btn.btn(@click="editCart({_id: exhibitions._id, quantity: 1})" push round icon="fa-regular fa-heart" color="pink")
        q-btn.btn( @click="Add = true" push rounded icon="fa-solid fa-cart-shopping" label="購票去" color="pink")
    q-chip.q-ml-xl(color="blue" size="md") ＃{{ exhibitions.category }}
    h2.col-12.q-ml-lg 【介紹】
    p.q-mx-xl.q-mb-xl.q-pr-xxl.text-p.pre {{ exhibitions.description }}
  .small-image.flex
    .col-3(v-for="img in exhibitions.images" :key="img")
      img(:src="img")
  q-dialog(v-model="Add")
    q-card(style="width: 90%")
      q-form
        q-input.row.item-center(v-model.number="quantity" type="number" label="數量")
</template>
<script setup>
import { ref, reactive } from 'vue'
import { api } from 'src/boot/axios'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import router from 'src/router'
import { useUserStore } from 'src/stores/users'

const $q = useQuasar()
const route = useRoute()
const user = useUserStore()
const { editCart } = user
const Add = ref(false)

const rules = {
  required (value) {
    return !!value || '欄位必填'
  },
  number (value) {
    return value >= 0
  }
}
const exhibitions = reactive({
  _id: '',
  title: '',
  name: '',
  from: '',
  to: '',
  place: '',
  description: '',
  image: undefined,
  images: [],
  delImages: [],
  price: 0,
  sell: true,
  map: undefined,
  category: ''
});

(async () => {
  const { data } = await api.get('/exhibitions/' + route.params.id)
  try {
    exhibitions._id = data.result._id
    exhibitions.title = data.result.title
    exhibitions.name = data.result.name
    exhibitions.from = new Date(data.result.from).toLocaleDateString()
    exhibitions.to = new Date(data.result.to).toLocaleDateString()
    exhibitions.place = data.result.place
    exhibitions.description = data.result.description.replace(/\\n/g, '\n')
    exhibitions.image = data.result.image
    exhibitions.images = data.result.images
    exhibitions.delImages = data.result.delImages
    exhibitions.price = data.result.price
    exhibitions.sell = data.result.sell
    exhibitions.map = data.result.map
    exhibitions.category = data.result.category
    document.title = 'About | ' + data.result.title
  } catch (error) {
    $q.notify({
      message: '取得失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
    router.go(-1)
  }
})()
</script>
