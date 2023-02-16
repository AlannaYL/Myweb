<template lang="pug">
.swipwe-section
  RouterLink(:to='"/Exhibitions/" + _id')
    img.swipwe-img(:src="image")
  <br>
  //- .row.justify-between.items-center
  .border.q-mt-lg ＃{{ category }}
    //- q-btn(:icon="love ? 'fa-solid fa-heart' : 'fa-regular fa-heart'" @click="loveClick()" push round color="pink")
  .text
    h5 {{ title }}
    p {{ place }}
    p {{ new Date(from).toLocaleDateString() + '~' + new Date(to).toLocaleDateString() }}
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

// const love = ref(false)

// const emit = defineEmits(['editLove'])
// const loveClick = () => {
//   emit('editLove', 111)
//   love.value = !love.value
// }

defineProps({
  _id: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  from: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: ''
  },
  place: {
    type: String,
    default: undefined
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: undefined
  },
  images: {
    type: [String],
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  sell: {
    type: Boolean,
    default: false
  },
  map: {
    type: String
  },
  category: {
    type: String,
    default: ''
  }
}
)
</script>
