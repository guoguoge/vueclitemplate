<template>
<div class="home">
  <img alt="Vue logo" src="../assets/logo.png">
</div>
</template>

<script>
import {
  getServiceOrder
} from '@/api/data'

import A from '@/components/A.vue'

export default {
  name: 'home',
  components: {
    A
  },
  mounted() {
    getServiceOrder().then(res => {
      console.log(res);
    })
  }
}
</script>
