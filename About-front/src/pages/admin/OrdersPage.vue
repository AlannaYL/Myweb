<template lang="pug">
#AdminOrder
  h4.text-center.col-12 訂單管理
  .row
    .col-12
      q-table.item-center(:rows="orders" :columns="columns" row-key="_id")
        template(v-slot:body-cell-number="props")
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
    name: 'date',
    label: '訂單日期',
    field: row => new Date(row.date).toLocaleDateString(),
    align: 'center'
  },
  {
    name: 'account',
    label: '會員',
    field: row => row.u_id.account,
    align: 'center'
  },
  {
    name: 'number',
    label: '數量',
    align: 'center'
  },
  {
    name: 'total',
    label: '小計',
    field: row => row.totalPrice,
    align: 'center'
  }
]

const orders = reactive([]);

(async () => {
  try {
    const { data } = await apiAuth.get('/orders/all')
    orders.push(...data.result.map(order => {
      order.totalPrice = order.products.reduce((total, current) => total + current.p_id.price * current.quantity, 0)
      return order
    }))
  } catch (error) {
    $q.notify({
      message: '取得失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()
</script>
