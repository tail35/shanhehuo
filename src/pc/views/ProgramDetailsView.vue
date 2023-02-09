
<script setup lang="ts">
//https://www.npmjs.com/package/js-cookie
import Cookies from 'js-cookie'
import {inject,onMounted,getCurrentInstance,computed,ref,reactive,toRaw} from 'vue';

import { useRoute } from 'vue-router';
import {imgUrl,login_urlAction,
  login_urlImg,ProgramDetailControllUrl,
  ProgramImgeControllUrl,PartnerNamesControllUrl,
  InterestedControllUrl,OnePersonDetailsUrl,
  ProgramDetailByAccidControllUrl,MessageUrl 
} from "../js/common.ts"
import {SubmitRegister} from "../js/register"
import axios from 'axios' //dhlu
import { objectExpression } from '@babel/types';

const UpdateKey = inject('UpdateKey');
const {ctx,proxy} = getCurrentInstance()

let message = reactive({})
var programDetail = reactive({})
var programImgesUrls = ref([])//注意对象数据有区别。
var PartnerNames = ref([])
var Interested = ref([])
var personDetail = reactive({})
var programDetailByAccid = ref([])
window.myonload =function(){
}



const myurl = computed(() => {
  return (urlArray)=>{
    if(urlArray.length){
      return imgUrl+programImgesUrls.value[0].imgurl
    }
    return ""
  }
})

function OnDetailsButton(){
  var accid = proxy.$router.currentRoute.value.query.accid
  var programid= proxy.$router.currentRoute.value.query.programid

  proxy.$router.push({name:'JoinDetails',query: {accid:accid,programid:programid}})//query: url后跟id,params: 是post 刷新丢失id
  //console.log("OnDetailsButton");
}


function OnJoinInput(){
  var accid = proxy.$router.currentRoute.value.query.accid //programaccid
  var programid= proxy.$router.currentRoute.value.query.programid
  proxy.$router.push({name:'JoinInput',query: {accid:accid,programid:programid}})//query: url后跟id,params: 是post 刷新丢失id
  //console.log("OnDetailsButton");
}

function OnLookupInfo()
{    
    proxy.$router.push({name:'PersonDetails',query: {accid:personDetail.accid}})//query: url后跟id,params: 是post 刷新丢失accid    
}

function OnClicklstDiv(item)
{  
  proxy.$router.push({name:'ProgramDetailsView',query:{accid:item.accid,programid:item.programid}})//query: url后跟id,params: 是post 刷新丢失id
  proxy.$forceUpdate()
  UpdateKey()
  //console.log(item.accid,item.programid);
}
// 生命周期钩子
onMounted(() => {
  function GetImgesUrl()
  {    
    //person base info 
    var programid= proxy.$router.currentRoute.value.query.programid
    let curl = ProgramImgeControllUrl+Math.random()+"&programid="+programid
    //console.log('111iurl:',curl)
    axios.get(curl)
      .then((obj) => {
        programImgesUrls.value = obj.data //数组是基本类型。用ref
        //console.log('111programImgesUrls:',programImgesUrls)
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }

  function GetProgramDetailByAccid()
  {
    //person base info 
    var accid= proxy.$router.currentRoute.value.query.accid
    let curl = ProgramDetailByAccidControllUrl+Math.random()+"&accid="+accid
    
    axios.get(curl)
      .then((obj) => {
        programDetailByAccid.value = obj.data
        //console.log('programDetailByAccid:',programDetailByAccid)
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }

   function GetProgramDetail()
   {
    //person base info 
    var programid= proxy.$router.currentRoute.value.query.programid
    let curl = ProgramDetailControllUrl+Math.random()+"&programid="+programid    
    
    axios.get(curl)
      .then((obj) => {
        //如果programDetail 名字错，会导致无法走catch分句。
        Object.assign(programDetail, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
        //console.log('programDetail:',obj.data)
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
   }
   function GetPartnerNanmes()
   {
    //person base info 
    var programid= proxy.$router.currentRoute.value.query.programid
    let curl = PartnerNamesControllUrl+Math.random()+"&programid="+programid    
    //console.log('PartnerNamesurl:',curl)
    axios.get(curl)
      .then((obj) => {
        //如果programDetail 名字错，会导致无法走catch分句。
        PartnerNames.value = obj.data //数组是基本类型。用ref
        //console.log('PartnerNames:',obj.data)
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });          
   }
   function GetInterestedControll()
   {
    //person base info 
    var accid= proxy.$router.currentRoute.value.query.accid
    //console.log('PartnerNamesurlaccid:',accid,proxy.$router.currentRoute.value.query.programid) 
    let curl = InterestedControllUrl+Math.random()+"&accid="+accid    
    //console.log('PartnerNamesurl:',curl)    
    axios.get(curl)
      .then((obj) => {
        //如果programDetail 名字错，会导致无法走catch分句。
        Interested.value = obj.data //数组是基本类型。用ref
        //console.log('Interested:',obj.data)
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });          
   }
   function GetPersonDetails(){
        //person base info 
        var accid= proxy.$router.currentRoute.value.query.accid
        let curl = OnePersonDetailsUrl+Math.random()+"&accid="+accid
        
        axios.get(curl)
          .then((obj) => {
            Object.assign(personDetail, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            //console.log('ppersonDetail:',obj.data)
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
    }
    function GetMessage(){
        var accid= proxy.$router.currentRoute.value.query.accid
        let curl =MessageUrl +Math.random()+"&accid="+accid
        console.log('222iurl:',curl)
        axios.get(curl)
          .then((obj) => {
            Object.assign(message, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            console.log("msg1:",message)
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
    }

   GetImgesUrl()
   GetProgramDetail()
   GetPartnerNanmes()
   GetInterestedControll()
   GetPersonDetails()
   GetProgramDetailByAccid()
   GetMessage()
});
</script>
<template>
  <div class="PersonDetailes">     
    <div>
      <img v-bind:src="myurl(programImgesUrls)" id="idProgramImg"  class="programimg" />    
    </div>
    
    <div>项目名称:{{programDetail.name}}</div>
    <span>地点:{{programDetail.province_name}}.{{programDetail.city_name}}  &nbsp&nbsp投资金额：{{programDetail.invested_fund}}</span>
    <div>团队人数:{{programDetail.team_number}}人 &nbsp&nbsp <span>浏览人数:{{programDetail.browse_numbers}}</span><span>&nbsp&nbsp发布时间:{{programDetail.create_time}}</span></div>
    <br>
    <div>项目描述：</div>
    <div>{{programDetail.description}}</div>
    <br>
    <div v-for="(item,index) in PartnerNames">
      <div>本项目找[{{item.partnership_name}}]合伙人,要求：</div>
      <span>&nbsp&nbsp{{item.join_condition}}</span>
    </div>
    <br>
    
    <div>
      <span v-for="(item,index) in Interested">
        <img class="inImg" v-bind:src="imgUrl+item.imgurl" />
      </span>
      共{{Interested.length}}人想加入&nbsp
      <button class="bdetails" v-on:click="OnDetailsButton()">详情</button>&nbsp&nbsp
      <button v-on:click="OnJoinInput()">我想加入</button>
    </div>
    <br>

    <div>本项目由[{{personDetail.name}}]发布&nbsp&nbsp<button v-on:click="OnLookupInfo()">查看他信息 </button></div>
    <div>他的所有项目如下：</div>
    <div v-for="(item,index) in programDetailByAccid" >
      <div class="lstdiv" v-on:click="OnClicklstDiv(item)">
        <img v-bind:src="imgUrl+item.imgurl" class="lstimg" />&nbsp&nbsp<span>{{item.name}}</span>
      </div>
    </div>
    <br>
    
    <div>留言:</div>
    <button>发送</button>
    <textarea class='idmessage'/>
    
    <div v-for="(item,index) in message" >
      <div>
        <span>
          <img class="msg_head" v-bind:src="imgUrl+item.imgurl">
          <span class="mname">{{item.name}}</span>
          <span class="mtime">{{item.create_time}}</span>
        </span>
      </div>
      <div class="msg_message">{{item.message}}</div>
    </div>

  </div>
</template>
<style>
.PersonDetailes{
  min-height: 100vh;
  border: 1px solid indianred;
}
.pjingyan{
  clear: both;
  display: block;
}
.programimg{
  width:300px;
  height:169px;
  border: 1px solid red;
}
.inImg{
  width: 28px;
  height: 16px;
  border-radius: 50px 50px 50px 50px;
  border: 1px solid red;
}
.lstimg{
  width: 28px;
  height: 16px;
}
.lstdiv{
  width: fit-content;
  border: 1px solid red;
  border-radius: 5px;
}
.lstdiv:hover{
  border-color: aquamarine;
  border: 2px solid;
}
</style>
