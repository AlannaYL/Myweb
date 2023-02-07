<template lang="pug">
#register
  q-card-section
    q-form(@submit="register").q-gutter-md
      q-input(outlined v-model="form.account" :rules="[rules.account,rules.length]" label-color="blue" color="grey-3" placeholder="輸入帳號")
      q-input(outlined v-model="form.email" type="email" :rules="[rules.addemail,rules.email]" label-color="blue" color="grey-3" placeholder="輸入信箱")
      q-input(outlined type="password" v-model="form.password" :rules="[rules.password,rules.length]" label-color="blue" color="grey-3" placeholder="輸入密碼")
      q-input(outlined type="password" v-model="form.passwordConfirm" :rules="[rules.password,rules.length, rules.passwordConfirm]" label-color="blue" color="grey-3" placeholder="確認密碼")
      .col-12.text-center.q-gutter-sm
        q-btn(label="成為會員" type="submit" push rounded color="pink" text-color="white" :loading="loading")
</template>
<script setup>
import { ref, reactive } from 'vue'
import validator from 'validator'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/users'
import router from 'src/router'

const loading = ref(false)
const form = reactive({
  account: '',
  password: '',
  passwordConfirm: '',
  email: ''
})

const $q = useQuasar()
const user = useUserStore()

const rules = {
  email (value) {
    return validator.isEmail(value) || '格式錯誤'
  },
  length (value) {
    return (value.length >= 4 && value.length <= 20) || '長度必須為 4 ~ 20 個字'
  },
  account (value) {
    return !!value || '帳號必填'
  },
  addemail (value) {
    return !!value || '信箱必填'
  },
  password (value) {
    return !!value || '密碼必填'
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
      color: 'pink'
    })
  }
  loading.value = false
}
</script>
