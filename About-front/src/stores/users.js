import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api, apiAuth } from 'boot/axios'
import { useQuasar } from 'quasar'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const cart = ref(0)
  const role = ref(false)
  const $q = useQuasar()

  const isLogin = computed(() => {
    return token.value === false
  })
  const isAdmin = computed(() => {
    return role.value === true
  })

  const avatar = computed(() => {
    return `https://source.boringavatars.com/beam/256/${account.value}?colors=ffabab,ffdaab,ddffab,abe4ff,d9abff`
  })

  const login = async (form) => {
    try {
      const { data } = await api.post('/users/login', form)
      token.value = data.result.token
      account.value = data.result.account
      email.value = data.result.email
      cart.value = data.result.cart
      role.value = data.result.role
      $q.notify({
        message: '已登入',
        color: 'pink'
      })
    } catch (error) {
      $q.notify({
        message: '登入失敗',
        caption: error?.response?.data?.message || '發生錯誤',
        color: 'pink'
      })
    }
  }
  const logout = async () => {
    try {
      await apiAuth.delete('/users/logout')
      token.value = ''
      account.value = ''
      role.value = 0
      cart.value = 0
      $q.notify({
        message: '已登出',
        color: 'pink'
      })
    } catch (error) {
      $q.notify({
        message: '登出失敗',
        caption: error?.response?.data?.message || '發生錯誤',
        color: 'pink'
      })
    }
  }

  return {
    token,
    account,
    email,
    cart,
    role,
    login,
    logout
  }
}, {
  persist: {
    key: 'User',
    paths: ['token']
  }
})
