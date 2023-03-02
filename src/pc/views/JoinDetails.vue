
<script setup lang="ts">
//https://www.npmjs.com/package/js-cookie
import Cookies from 'js-cookie'
import { onMounted,getCurrentInstance,computed,ref,reactive,toRaw} from 'vue';

import { useRoute } from 'vue-router';
import {imgUrl,login_urlAction,
  login_urlImg,JoinDetailsControllUrl
} from "../js/common.ts"
import {SubmitRegister} from "../js/register"
import axios from 'axios' //dhlu
import { objectExpression } from '@babel/types';

const {ctx,proxy} = getCurrentInstance()

var joinDetails = ref([])

window.myonload =function(){
}

// 生命周期钩子
onMounted(() => {
  function GetJoinDetails()
  {
    
    var accid= proxy.$router.currentRoute.value.query.accid
    var programid= proxy.$router.currentRoute.value.query.programid
    let curl = JoinDetailsControllUrl+Math.random()+"&accid="+accid+"&programid="+programid
    //console.log('detailsurl:',curl)
    axios.get(curl)
      .then((obj) =>{
        joinDetails.value = obj.data //数组是基本类型。用ref
        //console.log('joinDetails:',joinDetails)
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }  
  GetJoinDetails()

});
</script>
<template>
  <div class="JoinDetailes">     
  
    <div v-for="(item,index) in joinDetails">
      <br/>
      <span><img v-bind:src="imgUrl+item.imgurl" class="detailsHead"/>  &nbsp名称:{{item.name}}</span>      
      <div>感兴趣原因：{{item.interested_cause}}</div>
      <div>我的优势：{{item.advantage}}</div>
      <div>我的微信：{{item.weixin}}</div>
    </div>
  </div>
</template>


<style>
.detailsHead{
  width: 25px;
  height: 14px;
  border: 1px solid greenyellow;
  border-radius: 50%;
}

</style>
