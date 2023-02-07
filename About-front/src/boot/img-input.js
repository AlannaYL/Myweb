import { boot } from 'quasar/wrappers'
import VImageInput from 'vue3-img-input'
export default boot(({ app }) => {
  app.component('v-image-input', VImageInput)
})
