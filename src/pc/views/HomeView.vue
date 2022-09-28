<script setup lang="ts">
import TheWelcome from '@/pc/components/TheWelcome.vue'
import { onMounted,getCurrentInstance} from 'vue';
const {ctx,proxy} = getCurrentInstance()
//console.log('id:',proxy.$route.query.id )

isLoginFunForHead()

window.myp();

</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
<style>

</style>
