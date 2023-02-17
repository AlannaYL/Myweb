<template lang="pug">
#myLove
.row
  .col-12
    q-table.item-center(grid :rows="loves" row-key="_id")
      template(v-slot:item="props")
        div(class="col-xs-12 col-sm-6 col-md-4 q-pa-md")
          q-card
            q-card-section
              img(:src="props.row.image" style="height: 100px")
              strong {{ props.row.title }}
              br
              strong {{ new Date(props.row.from).toLocaleDateString() + '-' + new Date(props.row.to).toLocaleDateString() }}
              br
              strong 前往查看
                q-btn.q-ml-md(size="12px" icon="fa-solid fa-arrow-up-right-from-square" :to="'exhibitions/' + props.row._id" push round color="pink")
</template>
<script setup>
import { apiAuth } from 'src/boot/axios'
import { reactive, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/users'
import { useRoute } from 'vue-router'

const $q = useQuasar()
const route = useRoute()
const loves = reactive([]);

(async () => {
  try {
    const { data } = await apiAuth.get('/users/love')
    loves.push(...data.result)
  } catch (error) {
    $q.notify({
      message: '取得失敗',
      caption: error?.response?.data?.message || '發生錯誤',
      color: 'pink'
    })
  }
})()</script>
