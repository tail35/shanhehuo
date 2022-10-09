<template>
  <div class="PersonDetailes">     
  qqq
  </div>  
</template>

<script setup lang="ts">
    //https://www.npmjs.com/package/js-cookie
    import Cookies from 'js-cookie'
    import { onMounted,getCurrentInstance} from 'vue';
    import { useRoute } from 'vue-router';
    import {login_urlAction,login_urlImg} from "../js/common.ts"
    import {SubmitRegister} from "../js/register"

    const {ctx,proxy} = getCurrentInstance()


    window.myonload =function(){

    }

    // 生命周期钩子
    onMounted(() => {
       
    });
</script>
<style>
.PersonDetailes{

  min-height: 100vh;
  border: 1px solid indianred;
}

</style>
