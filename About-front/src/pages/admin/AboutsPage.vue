<template lang="pug">
#Admin-about.row
  h4.text-center.col-12 關於我們
  q-card.col-6.margin-auto
    q-form.q-pa-md(@submit="onSubmit")
      q-input.q-mb-md(v-model="form.content" type="textarea" label="請輸入第一段內容" filled)
      q-input(v-model="form.description" type="textarea" label="請輸入第二段內容" filled)
      .row
        p 圖片預覽
        .col-12(v-for="img in abouts[form]?.images" :key="img")
          q-img.full-width(:src="img")
            div.absolute-full.flex.flex-center(v-if="form.delImages.includes(img)")
              q-icon(name="delete")
          q-checkbox(v-model="form.delImages" :val="img")
      q-file.col-12.q-mb-md(v-model="form.images" filled stack-label label="選擇內容圖片" multiple :label="選擇內容圖片")
      q-btn.q-my-lg(label="編輯關於我們" type="submit" push rounded color="pink" )

</template>
<script setup>
import { apiAuth } from 'src/boot/axios'
import { reactive } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const abouts = reactive([])

const form = reactive({
  content: '',
  images: [],
  delImages: [],
  description: ''
})

const onSubmit = async () => {
  const fd = new FormData()
  fd.append('content', form.content)
  for (const i of form.images) {
    fd.append('images', i)
  }
  for (const i of form.delImages) {
    fd.append('delImages', i)
  }
  fd.append('description', form.description)
  try {
    const { data } = await apiAuth.patch('/abouts/', fd)
    abouts[form] = (data.result)
    $q.notify({
      message: '編輯成功',
      color: 'pink'
    })
  } catch (error) {
    $q.notify({
      message: '操作失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
};

(async () => {
  try {
    const { data } = await apiAuth.get('/abouts/')
    abouts.push(...data.result)
    console.log(abouts)
    form.content = abouts[0].content
    form.images = abouts[0].images
    form.delImages = []
    form.description = abouts[0].description
  } catch (error) {
    $q.notify({
      message: '取得失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()
</script>

<style lang="sass">
#Admin-about
  .margin-auto
    margin: auto
</style>
