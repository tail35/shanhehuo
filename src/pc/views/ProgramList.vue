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
    <!-- <div v-for="item in persones">
    {{item.name}}
    </div> -->
    <div v-for="(item,index) in programs" >
      <div class="pphitem" v-on:click="clickItem(item.accid,item.programid)">
        <img class="ppphoto" v-bind:src="imgUrl+item.imgurl"/>
        <div class="ppitem ponediv">
          <span class="peitem wname">名称：{{item.name}}  <span class="huoyue">上次活跃时间:{{item.modified_time}}</span></span>
          <span class="peitem shanchang" >团队人数：{{item.team_number}}</span><span>投入资金：{{item.invested_fund}}</span>
          <span class="peitem jingyan">城市：<span>{{item.province_name}}.{{item.city_name}}</span></span>
          <span class="petiem biaoqian">详情：<span>{{item.description}}</span></span>
        </div>
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
  .huoyue{
    margin-left: 10px;
  }
 .eitem{
 }
.ppitem{
  flex-direction: column;
  margin-left: 10px;
}
.phmain{
  min-height: 100vh;
}
.pphitem{
  display: flex;
  margin-top: 10px;
  border: 1px solid black;
}
.ppphoto,.ppitem{
  display: flex;
  float: left;  
  border: 1px solid red;
}
.ppphoto{
  width: 180px;
  height: 101px;
}
.ponediv{
  width:100%;
  height: 100%;
}

</style>
