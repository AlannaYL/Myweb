<template lang="pug">
#ExhibitionView.q-mb-xl
  .img-section.col-12
    img.img-width(:src="exhibitions.image")
  .text-section.co-12
    h1.col-12 {{ exhibitions.title }}
    p.q-mt-xl.text-p {{ exhibitions.from + '' + '~' + '' + exhibitions.to }}
      .text-right
        q-btn.btn(@click="editLove({_id: exhibitions._id})" round :icon="love ? 'fa-solid fa-heart' : 'fa-regular fa-heart'" color="pink")
        q-btn.btn(@click="Add = true" push rounded icon="fa-solid fa-cart-shopping" label="加入購物車" color="pink")
    q-chip(color="blue" size="md") ＃{{ exhibitions.category }}
    h2.col-12 【介紹】
    p.q-mb-xl.q-pr-xxl.text-p.pre {{ exhibitions.description }}
  .small-image.flex
    .col-3(v-for="img in exhibitions.images" :key="img")
      img(:src="img")
  q-dialog(v-model="Add")
    q-card(style="width: 60%")
      q-form(@submit.prevent="submitCart").row
        q-card-section.col-12
          h6 {{ exhibitions.title }}
        q-card-section.col-12
          q-input(v-model.number="quantity" type="number" label="請選擇數量" :rules="[rules.required, rules.number]")
          q-btn.q-mt-lg(push color="pink" label="加入購物車" type="submit")
</template>
<script setup>
import { ref, reactive } from 'vue'
import { api, apiAuth } from 'src/boot/axios'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import router from 'src/router'
import { useUserStore } from 'src/stores/users'

const $q = useQuasar()
const route = useRoute()
const user = useUserStore()
const { editCart } = user
const { isLogin } = storeToRefs(user)
const Add = ref(false)
const quantity = ref(0)
const love = ref(false)

const rules = {
  required (value) {
    return !!value || '欄位必填'
  },
  number (value) {
    return value >= 0 || '必須大於0'
  }
}

const submitCart = () => {
  editCart({ _id: exhibitions._id, quantity: quantity.value })
  Add.value = false
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
})

const editLove = async () => {
  try {
    const { data } = await apiAuth.post('/users/love', { p_id: route.params.id, love: !love.value })
    love.value = !love.value
    if (love.value === true) {
      $q.notify({
        message: '加入收藏',
        color: 'pink'
      })
    } else {
      $q.notify({
        message: '移除收藏',
        color: 'pink'
      })
    }
  } catch (error) {
    $q.notify({
      message: '失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
}

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

    if (isLogin.value) {
      const { data } = await apiAuth.get('/users/love/' + route.params.id)
      love.value = data.result
    }
    console.log(data)
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
