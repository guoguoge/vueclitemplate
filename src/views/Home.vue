<template>
<div class="home">
  <img alt="Vue logo" src="../assets/logo.png">
  <A msg="Welcome to Your Vue.js App" />
</div>
</template>

<script>
import {
  Resource
} from '@/api/data'

import A from '@/components/A.vue'

export default {
  name: 'home',
  components: {
    A
  },
  mounted() {
    Resource().then(res => {
      console.log(res);
    })
  }
}
</script>
