<template>
  <div class="PersonDetailes">     
    <div class="phitem">
      <img class="ppphoto" />
      <div class="ppitem ponediv">
        <span class="peitem pwname">名称：xxx <span class="isvip">vip</span> <span class="huoyue">上次活跃时间:2022-09-29</span></span>
        <span class="peitem pshanchang" >擅长：<span>xxxx</span></span>
        <span class="petiem pbiaoqian">标签：<span>xxxx</span></span>
        <span class="peitem pjingyan">经验：</span>
        <span >xxxx</span>
      </div>      
    </div>
    <div>项目描述：</div>
    <span>1.xxx。2.xxxx 3.xxxx</span>
    <div>联系方式:</div>
    <span>wq:xxxx</span>
   
    <div>留言:</div>
    <span>时间：xxxx留言：xxx  </span>
    <span>时间：xxxx留言：xxx  </span>
    <area />
    <button>发送</button>
  </div>
</template>

<script setup lang="ts">
    //https://www.npmjs.com/package/js-cookie
    import Cookies from 'js-cookie'
    import { onMounted,getCurrentInstance} from 'vue';
    import { useRoute } from 'vue-router';
    import {login_urlAction,login_urlImg} from "../js/common.ts"
    import {SubmitRegister} from "../js/register"
    import axios from 'axios' //dhlu
    const {ctx,proxy} = getCurrentInstance()    

    window.myonload =function(){
      
    }
    // 生命周期钩子
    onMounted(() => {      
      var id= proxy.$router.currentRoute.value.query.id
      axios.get(personListUrl+Math.random())
        .then((obj) => {          
          persones.value = ref( obj.data )
          console.log("wo:",toRaw( persones.value.value ) )
        }).catch((err) => {
            alert('连接服务器失败，请刷新页面尝试！')
        });

    });
</script>
<style>
.PersonDetailes{

  min-height: 100vh;
  border: 1px solid indianred;
}
.pjingyan{
  clear: both;
  display: block;
}

</style>
