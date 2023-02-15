<template lang="pug">
#AdminMember
  h4.text-center.col-12 會員管理
  .row.q-px-xl
    .q-pa-md.items-center.col-md-4.col-xs-12(v-for="user in members")
      q-card
        q-card-section(horizontal)
          q-img.q-ma-md(:src="`https://source.boringavatars.com/beam/${user.account}?colors=ffabab,ffdaab,ddffab,abe4ff,d9abff`" width="70px" height="70px")
          .column
            .text-h5.col.q-my-md {{ user.account }}
              .text-subtitle2 {{ user.email }}
                q-btn.q-ma-md(icon="edit" round push color="blue" @click="editBtn(members.findIndex(item => item._id === user._id ))")
  q-dialog(v-model="form.dialog")
    q-card(style="width: 90%")
      q-form(@submit="onSubmit")
        q-card-section.row.item-center
          .text-h6  編輯會員
        q-card-section
          q-input.col-12.q-pb-lg(v-model="form.account" filled label="請輸入會員帳號" type="text" )
          q-input.col-12.q-pb-lg(v-model="form.email" filled label="請輸入會員信箱" type="email")
        q-card-section.text-right
            q-btn(:disabled="form.loading" flat label='submit' type="submit" color='blue')
            q-btn(@click="cancel()" flat label='cancel' color='pink')
</template>
<script setup>
import { apiAuth } from 'src/boot/axios'
import { reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/users'
import { storeToRefs } from 'pinia'

const $q = useQuasar()
const user = useUserStore()
const { account, email } = storeToRefs(user)
const members = reactive([])

const form = reactive({
  _id: '',
  account: account.value || '',
  email: email.value || '',
  dialog: false,
  idx: -1
})

const editBtn = (idx) => {
  form._id = members[idx]._id
  form.account = members[idx].account
  form.email = members[idx].email
  form.idx = idx
  form.dialog = true
}

const cancel = () => {
  form._id = ''
  form.account = ''
  form.email = ''
  form.dialog = false
}

const onSubmit = async () => {
  // if (!form.valid) return
  form.loading = true
  // 建立一個新的 formdata 物件
  // fd.append(key, value)
  const fd = new FormData()
  fd.append('account', form.account)
  fd.append('email', form.email)
  try {
    const { data } = await apiAuth.patch('/users/edituser', fd)
    members[form.idx] = (data.result)
    $q.notify({
      message: '編輯成功',
      color: 'pink'
    })
    form.dialog = false
  } catch (error) {
    $q.notify({
      message: '操作失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
    form.dialog = false
  }
  form.loading = false
}

;(async () => {
  try {
    const { data } = await apiAuth.get('/users/all')
    members.push(...data.result)
  } catch (error) {
    $q.notify({
      message: '取得失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()
</script>
