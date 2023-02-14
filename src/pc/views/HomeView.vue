<script setup lang="ts">
import Cookies from 'js-cookie'
import TheWelcome from '@/pc/components/TheWelcome.vue'
import { isTemplateElement } from '@babel/types';
import {computed,ref,reactive,toRaw,onMounted,getCurrentInstance} from 'vue'
const {ctx,proxy} = getCurrentInstance()
import axios from 'axios' //dhlu
import {imgUrl,personListUrl} from "../js/common.ts"

//console.log('id:',proxy.$route.query.id )
isLoginFunForHead()
window.myp();
var persones=reactive([])

onMounted(()=>{
  axios.get(personListUrl+Math.random())
        .then((obj) => {
          persones.value = obj.data
          console.log('plist:',persones.value)
        }).catch((err) => {
            alert('连接服务器失败，请刷新页面尝试！')
        });
})

//传参数,计算属性值
const mytag = computed(() => {
  return (item)=>{
    var my = item.tag
    return my
  }
})
const myUrl = computed(() => {
  return (item)=>{    
    var url = imgUrl+item.imgurl+"?v="+Math.random()
    console.log("h:",url)
    return url
  }
})
function clickItem( accid ){  
    
  if("false" == Cookies.get('isLogin')){
    alert("请先登录。谢谢。")
    return;
  }
  proxy.$router.push({name:'PersonDetails',query: {id:accid}})//query: url后跟id,params: 是post 刷新丢失id
}

</script>

<template>
  <main class="hmain">
    <div v-for="(item,index) in persones.value" class="mainItem" v-on:click="clickItem(item.accid)">
    
        <img class="imgdiv" v-bind:src="imgUrl+item.imgurl"/>
        <div class="infodiv">
          <div class="wname"> {{item.name}} 
            <span class="isvip">vip</span> 
            <span class="huoyue"><a>上次活跃时间:</a>&nbsp;{{item.activeTime}}</span>
          </div>
          <div>
            <span><a>方向</a>:&nbsp&nbsp{{item.industry}}</span> 
            <span class="city">&nbsp;&nbsp;<a>城市</a>：{{item.province_name}}.{{item.city_name}}</span>
            <span class="role">&nbsp;&nbsp;<a>角色</a>：{{item.partnership_name}}</span>
          </div>
          <div class="biaoqian"><a>标签</a>：&nbsp{{mytag(item)}}</div>  
          <div class="jianjie"><a>简介</a>：&nbsp{{item.simple_introduce}}</div>          
        </div>
      
    </div>
  </main>
</template>
<style>
.infodiv a{
  color: red;
}
  .isvip{
    font: 1em sans-serif;
    margin-left: 10px;
    visibility: collapse;
  }
.mainItem{
  display: grid;
  grid-template-columns:180px auto;
  margin-top: 10px;
  border: 1px solid red;
}
.mainItem:hover{  
  cursor:pointer;
  border:3px solid blue;
}
.imgdiv{
  width: 180px;
  height: 101px;
  /* border: 1px solid red; */
}
.infodiv{
  margin-left: 10px;
  /* border: 1px solid red; */
}

</style>
