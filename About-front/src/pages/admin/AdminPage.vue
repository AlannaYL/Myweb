<template lang="pug">
#Admin-exhibitions.row
  h4.text-center.col-12 展覽管理
  q-btn(push rounded color="blue" label="新增展覽" @click="openAdd(-1)")
  .col-12
  q-dialog(v-model="form.dialog" persistent)
    q-card(style="width: 90%")
      q-card-section.row.item-center
        .text-h6 {{ form._id.length > 0 ? '編輯商品': '新增商品' }}
        q-space
        <q-btn icon="close" flat round dense v-close-popup />
      q-card-section.row
        q-input.col-12(v-model="form.title" filled label="請輸入展覽名稱" :rules="[rules.required]")
        q-input.col-6(type="text" filled v-model="form.from" label="請選擇開始日期")
          template(v-slot:append)
            q-icon(name="event" class="cursor-pointer")
              q-popup-proxy(cover transition-show="scale" transition-hide="scale")
                q-date(v-model="form.from" minimal)
        q-input.col-6(type="text" filled v-model="form.to" label="請選擇結束日期")
          template(v-slot:append)
            q-icon(name="event" class="cursor-pointer")
              q-popup-proxy(cover transition-show="scale" transition-hide="scale")
                q-date(v-model="form.to" minimal)
</template>
<script setup>
import { apiAuth } from 'src/boot/axios'
import { ref, reactive } from 'vue'

const exhibitions = reactive([])
const showFrom = ref(false)
const showTo = ref(false)

const rules = {
  required (value) {
    return !!value || '欄位必填'
  }
}

const form = reactive({
  _id: '',
  title: '',
  from: '',
  to: '',
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
    form.from = '2023/01/01'
    form.to = '2023/01/01'
    form.place = ''
    form.description = ''
    form.image = undefined
    form.sell = false
    form.map = undefined
    form.category = ''
    form.loading = false
    console.log(showFrom)
  } else {
    form._id = exhibitions[idx]._id
    form.title = exhibitions[idx].title
    form.from = exhibitions[idx].from
    form.to = exhibitions[idx].to
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
