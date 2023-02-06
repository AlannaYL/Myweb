<template lang="pug">
#Admin-exhibitions.row
  h4.text-center.col-12 展覽管理
  q-btn(push rounded color="blue" label="新增展覽" @click="openAdd(-1)")
  .col-12
  q-dialog(v-model="form.dialog" persistent)
    q-card
      q-card-section
        .text-h6 {{ form._id.length > 0 ? '編輯商品': '新增商品' }}
        q-space
        <q-btn icon="close" flat round dense v-close-popup />
</template>
<script setup>
import { apiAuth } from 'src/boot/axios'
import { reactive } from 'vue'

const exhibitions = reactive([])

const form = reactive({
  _id: '',
  title: '',
  date: '',
  place: '',
  description: '',
  image: undefined,
  sell: false,
  map: undefined,
  category: '',
  loading: false,
  dialog: false,
  idx: -1
})

const openAdd = (idx) => {
  if (idx === -1) {
    form._id = ''
    form.title = ''
    form.date = ''
    form.place = ''
    form.description = ''
    form.image = undefined
    form.sell = false
    form.map = undefined
    form.category = ''
    form.loading = false
  } else {
    form._id = exhibitions[idx]._id
    form.title = exhibitions[idx].title
    form.date = exhibitions[idx].date
    form.place = exhibitions[idx].place
    form.description = exhibitions[idx].description
    form.image = undefined
    form.sell = false
    form.map = undefined
    form.category = exhibitions[idx].category
    form.loading = false
  }
  form.dialog = true
}
</script>
