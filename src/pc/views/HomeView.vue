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
    <div>
      <img />
      <div>
        名称：
        擅长：xxx
        经验：
        标签：
      </div>
    </div>

  </main>
</template>
<style>
</style>
