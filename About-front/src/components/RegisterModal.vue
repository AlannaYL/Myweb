<template lang="pug">
q-card(style="width: 30%;max-width: 33.3%")
  q-card-section.row.items-center.q-pb-none.text-center
    .text-h5.col-12.text-pink 註冊
  q-card-section
    q-form(@submit="register").q-gutter-md
      q-input(outlined v-model="form.account" :rules="[rules.required,rules.length]" label-color="blue" color="grey-3" label="早安你好你的帳號是?")
      q-input(outlined v-model="form.email" type="email" :rules="[rules.email,rules.required]" label-color="blue" color="grey-3" label="早安你好你的信箱多少")
      q-input(outlined type="password" v-model="form.password" :rules="[rules.required,rules.length]" label-color="blue" color="grey-3" label="早安你好你的密碼是?")
      q-input(outlined type="password" v-model="form.passwordConfirm" :rules="[rules.required,rules.length, rules.passwordConfirm]" label-color="blue" color="grey-3" label="早安你好你的密碼在確認一下")
      div.col-12.text-center.q-gutter-sm
        q-btn(label="成為會員" type="submit" push rounded color="pink" text-color="white" :loading="loading")
</template>
<script setup>
import { ref, reactive } from 'vue'
import validator from 'validator'
import { api } from 'boot/axios.js'
import { useQuasar } from 'quasar'

const loading = ref(false)
const form = reactive({
  account: '',
  password: '',
  passwordConfirm: '',
  email: ''
})

const $q = useQuasar()

const rules = {
  email (value) {
    return validator.isEmail(value) || '格式錯誤'
  },
  required (value) {
    return !!value || '欄位必填'
  },
  length (value) {
    return (value.length >= 4 && value.length <= 20) || '長度必須為 4 ~ 20 個字'
  },
  passwordConfirm (value) {
    return (value === form.password) || '密碼不一致'
  }
}

const register = async () => {
  loading.value = true
  try {
    await api.post('/users', form)
    await $q.notify({
      message: '註冊成功',
      color: 'pink'
    })
  } catch (error) {
    $q.notify({
      message: '註冊失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: '#F8A680'
    })
  }
  loading.value = false
}
</script>
