<script setup lang="ts">
import Cookies from 'js-cookie'
import TheWelcome from '@/pc/components/TheWelcome.vue'
import { isTemplateElement } from '@babel/types';
import {inject,computed,ref,reactive,toRaw,onMounted,getCurrentInstance} from 'vue'
import axios from 'axios' //dhlu
import {imgUrl,personListUrl,pagesNumUrl} from "../js/common.ts"

const {ctx,proxy} = getCurrentInstance()
const UpdateKey = inject('UpdateKey')

isLoginFunForHead()
window.myp();
var persones=reactive([])
var pagesNum=reactive({})
var pageCur=reactive({value:1})

function isNumber(theObj) {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(theObj)) {
        return true;
      }
  return false;
}

onMounted(()=>{
  function GetPersonListUrl(){
    var pageindex = proxy.$router.currentRoute.value.query.pageindex
    if(null == pageindex){
      pageindex = Cookies.get("pageindex")
      if(null == pageindex){
        pageindex = 1;
      }
    }
    Cookies.set("pageindex",pageindex)
    
    pageCur.value = pageindex;
    //console.log("pageCur:",pageCur)
    var myurl = personListUrl+Math.random()+"&page="+pageindex
    //console.log("pg:",myurl)
    axios.get( myurl )
        .then((obj) => {
          persones.value = obj.data
          //console.log('plist:',persones.value)
        }).catch((err) => {
            alert('连接服务器失败，请刷新页面尝试！')
        });
  }
  function GetPageNum(){
    var myurl = pagesNumUrl+Math.random() 
    //console.log(pagesNumUrl)
    axios.get( myurl )
        .then((obj) => {
          Object.assign(pagesNum,obj.data)
          //console.log('pagesNum:',pagesNum)
          //flush

        }).catch((err) => {
            alert('连接服务器失败，请刷新页面尝试！')
        });
  }

  function JumpToPage(page){
    proxy.$router.push({name:'HomeView',query: {pageindex:page}})
    proxy.$forceUpdate()
    UpdateKey()
  }

  var idpageinput = document.getElementById("idpageinput")
  
  idpageinput.onblur = function(){
    var page = idpageinput.value
    if( null == page){
      return
    }
    if(false == isNumber(page) || "0"==page){
      alert('只能输入正整数!')
      return
    }
    JumpToPage(page)
  }
  GetPersonListUrl()
  GetPageNum()
  
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
    //console.log("h:",url)
    return url
  }
})
function clickItem( accid ){
    
  if("false" == Cookies.get('isLogin')){
    alert("请先登录。谢谢。")
    return;
  }
  proxy.$router.push({name:'PersonDetails',query: {accid:accid}})//query: url后跟id,params: 是post 刷新丢失id
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
    <br>
    <div class="pagetable">
      <ul class="pagination">
        当前是第<a class="curpagea">{{pageCur.value}}</a>页,&nbsp;
        <span>共{{pagesNum.PagesNum}}页,&nbsp;跳转到&nbsp;</span>
        <input id="idpageinput" class="pageinput" v-bind:value="pageCur.value" /> <span>页</span>
      </ul>
      <div class="pageright">
      </div>
  </div>
  </main>
</template>
<style>
.curpagea{
  color: red;
}
.pageinput{
  width: 60px;
}
.pagetable{
  display: grid;
  grid-template-columns:auto auto;
  border: 1px solid red;
}

/* .pageright{
  border: 1px solid green;
  text-align: center;
  padding: 16px 0px
} */


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
