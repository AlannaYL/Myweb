<template lang="pug">
#Admin-exhibitions.row
  h4.text-center.col-12 展覽管理
  q-btn.q-mb-lg(label="新增展覽" @click="openAdd(-1)" push rounded color="pink" )
  q-btn.q-ml-lg.q-mb-lg(v-for="(name, i) in filterName" :key="i" :label="name" @click="filterCategory = name" push rounded color="blue")
  .col-12
    q-table.item-center(:rows="filterData" :columns="columns" row-key="_id")
      template(v-slot:body-cell-image="props")
        q-td(style="width: 200px")
          img(:src="props.row.image" style="height: 100px")
      template(v-slot:body-cell-sell="props")
        q-td
          q-icon.btn-size(:name="props.row.sell? 'fa-solid fa-face-smile': 'fa-solid fa-face-dizzy'")
      template(v-slot:body-cell-edit="props")
        q-td
          q-btn(round @click="openAdd(filterData.findIndex(item => item._id === props.row._id ))" icon="fa-solid fa-pen-to-square")
  q-dialog(v-model="form.dialog" persistent)
    q-card(style="width: 90%")
      q-form(@submit="onSubmit")
        q-card-section.row.item-center
          .text-h6 {{ form._id.length > 0 ? '編輯商品': '新增商品' }}
          q-space
          <q-btn icon="close" flat round dense v-close-popup />
        q-card-section
          q-input.col-12.q-pb-lg(v-model="form.title" filled label="請輸入展覽名稱" :rules="[rules.required,rules.length]")
          q-input.col-12.q-pb-lg(v-model="form.name" filled label="請輸入主辦名稱" :rules="[rules.required,rules.length]")
          q-input.col-6.q-pb-lg(v-model="form.from" type="text" filled :rules="[rules.required]" label="請選擇開始日期")
            q-icon(name="event" size="24px" class="cursor-pointer q-py-md")
              q-popup-proxy(cover transition-show="scale" transition-hide="scale")
                q-date(v-model="form.from" minimal)
                  .row.items-center.justify-end
                    q-btn(label="OK" flat v-close-popup)
          q-input.col-6.q-pb-lg(v-model="form.to" type="text" filled :rules="[rules.required]"  label="請選擇結束日期")
              q-icon(name="event" size="24px" class="cursor-pointer q-py-md")
                q-popup-proxy(cover transition-show="scale" transition-hide="scale")
                  q-date(v-model="form.to" minimal)
                    .row.items-center.justify-end
                      q-btn(label="OK" flat v-close-popup)
          q-input.col-12.q-pb-lg(v-model="form.place" filled label="請輸入展覽地點" :rules="[rules.required]")
          q-input.col-12.q-pb-lg(v-model="form.description" filled type="textarea" label="請輸入展覽說明" :rules="[rules.required]")
          q-file.col-12(v-model="form.image" filled label="選擇主題圖片" stack-label)
            template(v-slot:append)
              q-icon(name="close" @click="clear" class="cursor-pointer")
          hr
          .row
            .col-3(v-if="form.idx >= 0" v-for="img in exhibitions[form.idx]?.images" :key="img")
              q-img.full-width(:src="img")
                div.absolute-full.flex.flex-center(v-if="form.delImages.includes(img)")
                  q-icon(name="delete")
              q-checkbox(v-model="form.delImages" :val="img")
          q-file.col-12.q-mb-md(v-model="form.images" filled stack-label label="選擇內容圖片" multiple)
            template(v-slot:append)
              q-icon(name="close" @click="clears" class="cursor-pointer")
          q-input.col-12.q-mb-md(v-model="form.price" filled type="number" prefix="$" label="請輸入價格" :rules="[rules.required]")
          q-checkbox.col-12(v-model="form.sell" label="上架" color="pink")
          q-input(v-model="form.map" label="地圖")
          q-select.col-12(v-model="form.category" filled :options="categories" label="請選擇覽展類別" :rules="[rules.required]")
        q-card-actions
          q-btn(:disabled="form.loading" flat label='submit' type="submit" color='blue')
</template>
<script setup>
import { apiAuth } from 'src/boot/axios'
import { ref, reactive, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const exhibitions = reactive([])
const filterName = ['全部', '藝文', '展覽', '活動']
const filterCategory = ref('全部')
const categories = ['展覽', '藝文', '活動']

const showFrom = ref(false)
const showTo = ref(false)

const columns = [
  {
    name: 'title',
    label: 'Title',
    field: row => row.title,
    align: 'center'
  },
  {
    name: 'from',
    label: 'From',
    field: row => new Date(row.from).toLocaleDateString(),
    align: 'center'
  },
  {
    name: 'to',
    label: 'To',
    field: row => new Date(row.to).toLocaleDateString(),
    align: 'center'
  },
  {
    name: 'image',
    label: 'Image',
    field: 'image',
    align: 'center'
  },
  {
    name: 'sell',
    label: 'Sell',
    align: 'center'
  },
  {
    name: 'category',
    label: 'Category',
    field: 'category',
    align: 'center'
  },
  {
    name: 'edit',
    label: 'Edit',
    align: 'center'
  }
]

const rules = {
  required (value) {
    return !!value || '欄位必填'
  },
  length (value) {
    return value.length >= 3 || '必須大於3個字'
  }
}

const form = reactive({
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
  sell: false,
  map: undefined,
  category: '',
  loading: false,
  dialog: false,
  idx: -1
})

const clear = () => { form.images = undefined }
const clears = () => { form.images = [] }

const openAdd = (idx) => {
  if (idx === -1) {
    form._id = ''
    form.title = ''
    form.name = ''
    form.from = '2023/01/01'
    form.to = '2023/01/01'
    form.place = ''
    form.description = ''
    form.image = undefined
    form.images = []
    form.delImages = []
    form.price = 0
    form.sell = false
    form.map = undefined
    form.category = ''
    form.loading = false
    form.idx = -1
  } else {
    form._id = exhibitions[idx]._id
    form.title = exhibitions[idx].title
    form.name = exhibitions[idx].name
    form.from = exhibitions[idx].from
    form.to = exhibitions[idx].to
    form.place = exhibitions[idx].place
    form.description = exhibitions[idx].description
    form.image = exhibitions[idx].image
    form.images = []
    form.delImages = []
    form.price = exhibitions[idx].price
    form.sell = exhibitions[idx].sell
    form.map = undefined
    form.category = exhibitions[idx].category
    form.loading = false
    form.idx = idx
  }
  form.dialog = true
}

const onSubmit = async () => {
  // if (!form.valid) return
  form.loading = true
  // 建立一個新的 formdata 物件
  // fd.append(key, value)
  const fd = new FormData()
  fd.append('title', form.title)
  fd.append('name', form.name)
  fd.append('from', form.from)
  fd.append('to', form.to)
  fd.append('place', form.place)
  fd.append('description', form.description)
  fd.append('image', form.image)
  for (const i of form.images) {
    fd.append('images', i)
  }
  for (const i of form.delImages) {
    fd.append('delImages', i)
  }
  fd.append('price', form.price)
  fd.append('sell', form.sell)
  fd.append('map', form.map)
  fd.append('category', form.category)
  try {
    // 當id長度為 0，新增
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/exhibitions', fd)
      exhibitions.push(data.result)
      $q.notify({
        message: '新增成功',
        color: 'pink'
      })
    } else {
      const { data } = await apiAuth.patch('/exhibitions/' + form._id, fd)
      exhibitions[form.idx] = (data.result)
      $q.notify({
        message: '編輯成功',
        color: 'pink'
      })
    }
    form.dialog = false
  } catch (error) {
    $q.notify({
      message: '操作失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
  form.loading = false
}

(async () => {
  try {
    const { data } = await apiAuth.get('/exhibitions/all')
    exhibitions.push(...data.result)
  } catch (error) {
    $q.notify({
      message: '取得失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()

const filterData = computed(() => {
  if (filterCategory.value !== '全部') {
    return exhibitions.filter(item => item.category === filterCategory.value)
  }
  return exhibitions
})
</script>
<style lang="sass">
.btn-size
  font-size: 30px
td
  text-align: center
</style>
