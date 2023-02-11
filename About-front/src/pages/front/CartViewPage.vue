<template lang="pug">
#cartView
  .row
    .col-12
      q-table.item-center(:rows="carts" :columns="columns" row-key="_id")
        template(v-slot:body-cell-image="props")
          q-td.text-center
            img(:src="props.row.p_id.image" style="height: 100px")
        template(v-slot:body-cell-plus="props")
          q-td.text-center
            q-btn(@click="updateCart(props.row, 1)"  icon="fa-solid fa-plus" push round  color="pink")
        template(v-slot:body-cell-minus="props")
          q-td.text-center
            q-btn(@click="updateCart(props.row, -1)" icon="fa-solid fa-minus"  push round )
</template>
<script setup>
import { apiAuth } from 'src/boot/axios'
import { reactive, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/users'
import { useRouter } from 'vue-router'

const router = useRouter()

const $q = useQuasar()
const user = useUserStore()
const { editCart, checkout } = user

const columns = [
  {
    name: 'image',
    label: '',
    align: 'center'
  },
  {
    namer: 'exhibitions',
    label: '展覽名稱',
    field: row => row.p_id.title,
    align: 'center'
  },
  {
    namer: 'price',
    label: '門票價格',
    field: row => row.p_id.price,
    align: 'center'
  },
  {
    name: 'plus',
    label: '',
    align: 'center'
  },
  {
    namer: 'number',
    label: '數量',
    field: 'quantity',
    align: 'center'
  },
  {
    name: 'minus',
    label: '',
    align: 'center'
  },
  {
    namer: 'total',
    label: '小計',
    field: row => row.quantity * row.p_id.price,
    align: 'center'
  }
]

const carts = reactive([])

const updateCart = async (row, quantity) => {
  const idx = carts.findIndex(cart => cart.p_id._id === row.p_id._id)
  await editCart({ _id: carts[idx].p_id._id, quantity })
  carts[idx].quantity += quantity
  if (carts[idx].quantity <= 0) {
    carts.splice(idx, 1)
  }
}

const onCheckoutBtnClick = async () => {
  await checkout()
  router.push('/orders')
};
(async () => {
  try {
    const { data } = await apiAuth.get('/users/cart')
    carts.push(...data.result)
  } catch (error) {
    $q.notify({
      message: '取得失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()
</script>
