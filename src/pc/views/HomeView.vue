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
          //console.log('plist:',persones.value)
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
          <div class="eitem wname"> {{item.name}} 
            <span class="isvip">vip</span> 
            <span class="huoyue">上次活跃时间:&nbsp;{{item.activeTime}}</span>
          </div>
          <div>
            <span>行业:&nbsp&nbsp{{item.industry}}</span> 
            <span class="etiem city">&nbsp;&nbsp;城市：北京.北京</span>
          </div>
          <div class="etiem biaoqian">标签：&nbsp{{mytag(item)}}</div>  
          <div class="eitem jingyan">简介：&nbsp{{item.simple_introduce}}</div>          
        </div>
      
    </div>
  </main>
</template>
<style>
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
.imgdiv{
  width: 180px;
  height: 101px;
  border: 1px solid greenyellow;
}
.infodiv{
  margin-left: 10px;
  border: 1px solid black;
}

</style>
