import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api, apiAuth } from 'boot/axios'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'
// const $q = useQuasar()

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const cart = ref(0)
  const role = ref(false)
  const ShowLogin = ref(false)

  const isLogin = computed(() => {
    return token.value.length > 0
  })
  const isAdmin = computed(() => {
    return role.value === true
  })

  const avatar = computed(() => {
    return `https://source.boringavatars.com/beam/56/${account.value}?colors=ffabab,ffdaab,ddffab,abe4ff,d9abff`
  })

  async function login (form) {
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
      role.value = false
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
  // 加入購物車 ＝ 加入收藏
  const editCart = async ({ _id, quantity }) => {
    if (token.value.length === 0) {
      Notify.create({
        message: '加入失敗',
        caption: '請先登入',
        color: 'pink'
      })
      return
    }
    try {
      const { data } = await apiAuth.post('/user/cart', { p_id: _id, quantity })
      cart.value = data.result
      Notify.create({
        message: '放入購物車',
        color: 'pink'
      })
    } catch (error) {
      Notify.create({
        message: '加入失敗',
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
    avatar,
    isLogin,
    isAdmin,
    ShowLogin,
    getUser,
    login,
    logout,
    editCart
  }
}, {
  persist: {
    key: 'User',
    paths: ['token']
  }
})
