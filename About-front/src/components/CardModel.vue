<template lang="pug">
.card-section
q-card(style="height: 280px")
  RouterLink(:to='"/Exhibitions/" + _id')
    q-img(:src="image")
      div.text-h5.absolute-bottom.text-right.color-pink
        p {{ title }}
        p {{ place }}
        p {{ new Date(from).toLocaleDateString() + '~' + new Date(to).toLocaleDateString() }}
</template>
<script setup>
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
