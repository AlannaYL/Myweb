<template lang="pug">
#myLove
.row
  .col-12
    q-table.item-center(:rows="loves" :columns="columns" row-key="_id")
      template(v-slot:body-cell-image="props")
        q-td
          img(:src="props.row.image" style="height: 100px")
      template(v-slot:body-cell-link="props")
        q-td.text-center
          q-btn(icon="fa-solid fa-arrow-up-right-from-square" :to="props.row._id" push round color="pink")
</template>
<script setup>
import { apiAuth } from 'src/boot/axios'
import { reactive, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/users'
import { useRoute } from 'vue-router'

const $q = useQuasar()
const route = useRoute()
const columns = [
  {
    name: 'image',
    label: '圖片',
    align: 'center'
  },
  {
    name: 'exhibitions',
    label: '展覽名稱',
    field: row => row.title,
    align: 'center'
  },
  {
    name: 'date',
    label: '日期',
    field: row => new Date(row.from).toLocaleDateString() + '-' + new Date(row.to).toLocaleDateString(),
    align: 'center'
  },
  {
    name: 'link',
    label: '展覽資訊',
    align: 'center'
  }
]
const loves = reactive([]);

(async () => {
  try {
    const { data } = await apiAuth.get('/users/love')
    loves.push(...data.result)
  } catch (error) {
    $q.notify({
      message: '取得失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()</script>
