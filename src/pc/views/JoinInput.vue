
<script setup lang="ts">
//https://www.npmjs.com/package/js-cookie
import Cookies from 'js-cookie'
import { onMounted,getCurrentInstance,computed,ref,reactive,toRaw} from 'vue';

import { useRoute } from 'vue-router';
import {imgUrl,login_urlAction,
  login_urlImg,JoinInputControllUrl
} from "../js/common.ts"
import {SubmitRegister} from "../js/register"
import axios from 'axios' //dhlu
import { arrayExpression, objectExpression } from '@babel/types';

const {ctx,proxy} = getCurrentInstance()

//var joinDetails = ref([])

function isNumber(theObj) {
  var reg = /^[0-9]+.?[0-9]*$/;
  if (reg.test(theObj)) {
    return true;
  }
  return false;
}
function GetValue(){
  
  var idinterested_cause = document.getElementById("idinterested_cause").value
  if( null == idinterested_cause ){
    alert("感兴趣原因不能空")
    return false;
  }
  
  var idtime = document.getElementById("idtime").value
  if(null==idtime){
    alert("投入时间不能空")
    return false;
  }
  var idfund = document.getElementById("idfund").value
  if(null==idfund || false ==isNumber( idfund ) ){
    alert("投入资金不能空，必须是数字。可以是0")
    return false;
  }
  var idadvantage = document.getElementById("idadvantage").value
  if(null==idadvantage ){
    alert("您的优势不能空")
    return false;
  }
  var idweixin = document.getElementById("idweixin").value
  if(null==idweixin ||  0==idweixin.length ){
    alert("微信号不能空，也可以注明其他连续方式。")
    return false;
  }
  var arr={}
  arr.interested_cause=idinterested_cause
  arr.investment_time=idtime
  arr.fund=idfund
  arr.advantage=idadvantage
  arr.weixin=idweixin
  arr.accid=  proxy.$router.currentRoute.value.query.accid //program accid
  arr.interested_accid = Cookies.get('myaccid');//login accid. 
  arr.programid= proxy.$router.currentRoute.value.query.programid

  console.log("11:",JSON.stringify(arr) )
  return arr
}
function OnSubmit(){
  var arr = GetValue()
  if(false == arr){
    return
  }

  let curl = JoinInputControllUrl+Math.random()
  console.log('JoinInput:',curl)

  axios.post(curl,arr)//默认json格式
    .then((obj) =>{
      console.log("11:",obj.data.code)

      if( null!=obj.data.code && 0==obj.data.code){
        alert("提交成功。")
      }
    }).catch((err) => {
        alert('连接服务器失败，请刷新页面尝试！')
    });
  }
//未尝试，下面可指定头部
//   axios({
//   method: "post",
//   url: "myurl",
//   data: bodyFormData,
//   headers: { "Content-Type": "multipart/form-data" },
// })
//   .then(function (response) {
//     //handle success
//     console.log(response);
//   })
//   .catch(function (response) {
//     //handle error
//     console.log(response);
//   });

window.myonload =function(){
}

// 生命周期钩子
onMounted(() => {

});
</script>
<template>
  <div class="JoinInput">
    <div >  
      <br />    
      <div>您感兴趣原因：<input id="idinterested_cause" class="interested_cause" type="text" name="interested_cause"></div>
      <br />
      <div>您可投入的时间：<input id="idtime" class="time" type="text" name="time" value="全天"></div>
      <br />
      <div>您可投入的资金：<input id="idfund" class="fund" type="text" name="fund" value="0">万元</div>
      <br />
      <div>您的优势：<input id="idadvantage" class="idadvantage" type="text" name="idadvantage" value="销售能力强"></div>
      <br>
      <div>您的微信：<input id="idweixin" class="weixin" type="text" name="weixin"></div>
      <br>
      <button  v-on:click="OnSubmit()">提交</button>
    </div>
  </div>
</template>


<style>

</style>
