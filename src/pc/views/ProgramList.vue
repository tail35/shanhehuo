<script setup lang="ts">
import Cookies from 'js-cookie'
import TheWelcome from '@/pc/components/TheWelcome.vue'
import { isTemplateElement } from '@babel/types';
import {computed,ref,reactive,toRaw,onMounted,getCurrentInstance} from 'vue'
const {ctx,proxy} = getCurrentInstance()
import axios from 'axios' //dhlu
import {imgUrl,personListUrl,ProgramListControllUrl} from "../js/common.ts"

//console.log('id:',proxy.$route.query.id )
isLoginFunForHead()
window.myp();
var programs=ref([])

onMounted(()=>{
  axios.get(ProgramListControllUrl+Math.random())
        .then((obj) => {       
          programs.value= obj.data
          //console.log('programs:',obj.data)
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
function clickItem( accid,programid ){  
  if("false" == Cookies.get('isLogin')){
    alert("请先登录。谢谢。")
    return;
  }
  proxy.$router.push({name:'ProgramDetailsView',query: {accid:accid,programid:programid}})//query: url后跟id,params: 是post 刷新丢失id
}

</script>

<template>
  <main class="phmain">
    <div v-for="(item,index) in programs" class="pmainItem" v-on:click="clickItem(item.accid,item.programid)">
      
        <img class="pimgdiv" v-bind:src="imgUrl+item.imgurl"/>
        <div class="pinfodiv">
          <span class="pwname"><span class="ptext"><a>名称</a>：</span>&nbsp;{{item.name}}  <span class="huoyue">&nbsp;&nbsp;<a>上次活跃时间:</a>&nbsp;{{item.modified_time}}</span></span>
          <br>
          <div class="pshanchang"><a>团队人数：</a>{{item.team_number}}&nbsp;&nbsp;<a>投入资金：</a>{{item.invested_fund}}</div>
          <div class="pjingyan"><a>城市：</a>&nbsp;{{item.province_name}}.{{item.city_name}}&nbsp;&nbsp;<a>详情：</a>&nbsp;{{item.description}}</div>
        </div>      
    </div>
  </main>
</template>
<style>
.pinfodiv a{
  color: red;
}
  .isvip{
    font: 1em sans-serif;
    margin-left: 10px;
    visibility: collapse;
  }
  .pmainItem{
  display: grid;
  grid-template-columns:180px auto;
  margin-top: 10px;
  border: 1px solid red;
}
.pmainItem:hover{
  cursor:pointer;
  border:3px solid blue;
}
.pimgdiv{
  width: 180px;
  height: 101px;
  /* border: 1px solid red; */
}
.pinfodiv{
  margin-left: 10px;
  /* border: 1px solid red; */
}

</style>
