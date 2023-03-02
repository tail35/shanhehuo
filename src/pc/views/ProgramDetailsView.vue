
<script setup lang="ts">
//https://www.npmjs.com/package/js-cookie
import Cookies from 'js-cookie'
import {inject,onMounted,getCurrentInstance,computed,ref,reactive,toRaw} from 'vue';

import { useRoute } from 'vue-router';
import {imgUrl,login_urlAction,
  login_urlImg,ProgramDetailControllUrl,
  ProgramImgeControllUrl,PartnerNamesControllUrl,
  InterestedControllUrl,OnePersonDetailsUrl,
  ProgramDetailByAccidControllUrl,MessageUrl ,
  ProgramMessageUrl,
  InsertProgramMsgUrl
} from "../js/common.ts"
import {SubmitRegister} from "../js/register"
import axios from 'axios' //dhlu
import { objectExpression } from '@babel/types';
import ProgramMsg from "../components/ProgramMsg.vue"

const UpdateKey = inject('UpdateKey');
const {ctx,proxy} = getCurrentInstance()

let message = ref([])
var programDetail = reactive({})
var programImgesUrls = ref([])//注意对象数据有区别。
var PartnerNames = ref([])
var Interested = ref([])
var personDetail = reactive({})
var programDetailByAccid = ref([])
var ProgramMsgPageCur=reactive({value:1})
var ProgramPagesNum=reactive({})

window.myonload =function(){
}

function isNumber(theObj) {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(theObj)) {
        return true;
      }
  return false;
}

function GetPageNum() {
    var accid = proxy.$router.currentRoute.value.query.accid
    var programid= proxy.$router.currentRoute.value.query.programid
    var myurl = ProgramMsgPagesNumUrl+Math.random() +"&toaccid="+accid+"&programid="+ programid
    //console.log(pagesNumUrl)
    axios.get( myurl )
        .then((obj) => {
          Object.assign(ProgramPagesNum,obj.data)
          //console.log('pagesNum:',pagesNum)
          //flush
        }).catch((err) => {
            alert('连接服务器失败，请刷新页面尝试！')
        });
    }

    function OnProgramSendMsg()
    {
      
      var idProgramMsg = document.getElementById("idProgramMsg")
      if (null==idProgramMsg || ""== idProgramMsg.value ){
        return
      }

      let curl = InsertProgramMsgUrl+Math.random()
      //axios.post(curl,idMsg.value,{ headers: {'Content-Type': 'text/plain'} })
      var arr={};
      arr.toaccid=proxy.$router.currentRoute.value.query.accid
      arr.fromaccid=Cookies.get("myaccid")
      arr.programid = proxy.$router.currentRoute.value.query.programid
      arr.message = idProgramMsg.value
            
      //var tmp = JSON.stringify(arr)
      //axios data 必须是array对象，不要自己string化。
      //插入聊天数据
      axios.post( curl,arr)
          .then((obj) => {            
              if(0 == obj.data.code){
                //reload message.
                console.log("msg:",obj.data)
                GetMessage(1);
              }            
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
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
function GetMessage(pageindex){
      if(null == pageindex){
          pageindex = Cookies.get("PersonMsgPageindex")
          if(null == pageindex){
            pageindex = 1;
          }
        }
        Cookies.set("ProgramMsgPageindex",pageindex)
        ProgramMsgPageCur.value = pageindex;

        var accid= proxy.$router.currentRoute.value.query.accid
        var programid= proxy.$router.currentRoute.value.query.programid
        let curl =ProgramMessageUrl +Math.random()+"&accid="+accid+"&page="+pageindex+"&programid="+programid
        //console.log('222iurl:',curl)
        axios.get(curl)
          .then((obj) => {
            message.value = obj.data
            //console.log("msg1:",message)
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
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

    //获取当前页
    var idProgramPageinput = document.getElementById("idProgramPageinput")  
    idProgramPageinput.onblur = function(){
        var page = idProgramPageinput.value
        if( null == page){
          return
        }
        if(false == isNumber(page) || "0"==page){
          alert('只能输入正整数!')
          return
        }
        //console.log("page111:",page)
        GetMessage(page)
      }
   GetImgesUrl()
   GetProgramDetail()
   GetPartnerNanmes()
   GetInterestedControll()
   GetPersonDetails()
   GetProgramDetailByAccid()
   GetMessage(1)
});
</script>
<template>  
  <div class="PersonDetailes">
    <br/>
    <div>产品图片:</div>
    <table class="pimg">
      <tr>
        <td v-for="(item,index) in programImgesUrls">
          <img v-bind:src="imgUrl+item.imgurl" id="idProgramImg"  class="programimg" />    
        </td>
      </tr>
    </table>
    
    <div>项目名称:&nbsp{{programDetail.name}}</div>
    <span>地点:&nbsp{{programDetail.province_name}}.{{programDetail.city_name}}  &nbsp&nbsp投资金额:&nbsp{{programDetail.invested_fund}}万元</span>
    <div>团队人数:&nbsp{{programDetail.team_number}}人 &nbsp&nbsp <span>浏览人数:&nbsp{{programDetail.browse_numbers}}</span><span>&nbsp&nbsp发布时间:&nbsp{{programDetail.create_time}}</span></div>
    <br>
    <div>项目介绍：</div>
    <div>{{programDetail.description}}</div>
    <br>
    <div>招募信息：</div>
    <div v-for="(item,index) in PartnerNames">
      <div>[{{item.partnership_name}}]要求：</div>
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
    <button v-on:click="OnProgramSendMsg()">发送</button>
    <textarea id="idProgramMsg" class='ProgramMessage'/>
    <!-- program留言 -->
    <ProgramMsg :message="message" > </ProgramMsg>
    <div class="ProgramPagetable">
      <ul class="ProgramPagination">
        当前是第<a class="ProgramCurPage">{{ProgramMsgPageCur.value}}</a>页,&nbsp;
        <span>共{{ProgramPagesNum.PagesNum}}页,&nbsp;跳转到&nbsp;</span>
        <input id="idProgramPageinput" class="ProgramPageinput" v-bind:value="ProgramMsgPageCur.value" /> <span>页</span>
      </ul>
      <div class="ProgramPageRight">
      </div>
    </div>

  </div>
</template>
<style>

.ProgramMessage{
  width: 400px;
  height:50px;
  border: 1px solid red;
  display: block;
  margin-bottom: 10px;
}

.ProgramCurPage{
  color: red;
}
.ProgramPageinput{
  width: 60px;
}
.ProgramPagetable{
  display: grid;
  grid-template-columns:auto auto;
  border: 1px solid red;
}


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
  /* border: 1px solid red; */
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
