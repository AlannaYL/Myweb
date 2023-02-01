<template lang="pug">
#Login
  q-card-section.items-end
    q-form(@submit="login").q-gutter-md
      q-input(outlined v-model="form.account" :rules="[rules.account,rules.length]" label-color="blue" color="grey-3" placeholder="輸入帳號")
      q-input(outlined type="password" v-model="form.password" :rules="[rules.password,rules.length]" label-color="blue" color="grey-3" placeholder="輸入密碼")
      .col-12.text-center.q-gutter-sm
        q-btn(label="登入" type="submit" push rounded color="pink" text-color="white" :loading="loading")
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/users'

const user = useUserStore()

const loading = ref(false)
const form = reactive({
  account: '',
  password: ''
})

const $q = useQuasar()

const rules = {
  length (value) {
    return (value.length >= 4 && value.length <= 20) || '長度必須為 4 ~ 20 個字'
  },
  account (value) {
    return !!value || '請輸入帳號'
  },
  password (value) {
    return !!value || '請輸入密碼'
  }
}

const login = async () => {
  loading.value = true
  await user.login(form)
  loading.value = false
}
</script>
