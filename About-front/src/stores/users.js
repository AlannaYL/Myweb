import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api, apiAuth } from 'boot/axios'
import { Notify } from 'quasar'
import Swal from 'sweetalert2'
import router from 'src/router'
// const $q = useQuasar()

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const cart = ref(0)
  const role = ref(false)
  const ShowLogin = ref(false)
  const noShowRegister = ref(false)

  const isLogin = computed(() => {
    return token.value.length > 0
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
      Notify.create({
        message: '登入成功',
        color: 'pink'
      })
    } catch (error) {
      console.log(error)
      Notify.create({
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
      Notify.create({
        message: '已登出',
        color: 'pink'
      })
    } catch (error) {
      Notify.create({
        message: '登出失敗',
        caption: error?.response?.data?.message || '發生錯誤',
        color: 'pink'
      })
    }
  }

  const getUser = async () => {
    if (token.value.length === 0) return
    try {
      const { data } = await apiAuth.get('/users/me')
      account.value = data.result.account
      email.value = data.result.email
      cart.value = data.result.cart
      role.value = data.result.role
    } catch (error) {
      logout()
    }
  }

  return {
    token,
    account,
    email,
    cart,
    role,
    isLogin,
    ShowLogin,
    getUser,
    login,
    logout,
    noShowRegister
  }
}, {
  persist: {
    key: 'User',
    paths: ['token']
  }
})
