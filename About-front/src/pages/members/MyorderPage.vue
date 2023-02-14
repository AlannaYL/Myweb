<template lang="pug">
#myOrder
  .row
    .col-12
      q-table.item-center(:rows="orders" :columns="columns" row-key="_id")
        template(v-slot:body-cell-happy="props")
          q-td.text-center
            template(v-for="product in props.row.products")
              p {{ product.quantity + "張" + product.p_id.title }}
</template>
<script setup>
import { reactive } from 'vue'
import { apiAuth } from 'src/boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const columns = [
  {
    name: 'ID',
    label: '訂單編號',
    field: row => row._id,
    align: 'center'
  },
  {
    name: 'happy',
    label: '數量',
    align: 'center'
  },
  {
    name: 'total',
    label: '小計',
    field: row => row.totalPrice,
    align: 'center'
  },
  {
    name: 'edit',
    label: '',
    align: 'center'
  }
]

const orders = reactive([]);

(async () => {
  try {
    const { data } = await apiAuth.get('/orders')
    orders.push(...data.result.map(order => {
      order.totalPrice = order.products.reduce((total, current) => total + current.p_id.price * current.quantity, 0)
      return order
    }))
    console.log(data)
  } catch (error) {
    $q.notify({
      message: '取得失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()
</script>
