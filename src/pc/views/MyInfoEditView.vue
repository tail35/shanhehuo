

<script setup lang="ts">
//
//https://www.npmjs.com/package/js-cookie
import Cookies from 'js-cookie'
import {computed,ref,
  reactive,toRaw,
  onMounted,getCurrentInstance
  } from 'vue'
import { useRoute } from 'vue-router';
import {
  imgUrl,OnePersonDetailsUrl,
  SimpleProgramsUrl,
  ContactUrl,
  WorkUrl,
  EducationUrl,
  PersonMessageUrl,
  InsertPersonMsgUrl,
  personMsgPagesNumUrl,
  CityControllUrl,
  ProVinceUrl,
  CurProvinceCityRoleUrl,
  UpdateBaseInfoUrl,
  RolsesControllUrl,
  UpdateWorkUrl,
  UpdateEducationkUrl,
  UpdateContactUrl
} from "../js/common.ts"
import {SubmitRegister} from "../js/register"
import axios from 'axios' //dhlu
import PersonMsg from "../components/PersonMsg.vue"
import { parse } from '@babel/parser';


const {ctx,proxy} = getCurrentInstance()
//ref: https://qa.1r1g.com/sf/ask/4601250111/
let personDetail=ref({}) //ref自动深度属性响应式
let programs = reactive({})
let contact = ref({})
let work = ref([])
let education = ref([])
let provicne = ref([])
let cityList = ref([])

let Rolses=ref([])


let curRolseIndex=0
let curProvinceIndex=0
let curCityIndex=0

window.myonload =function(){
}

function isNumber(theObj) {
  var reg = /^[0-9]+.?[0-9]*$/;
  if (reg.test(theObj)) {
    return true;
  }
  return false;
}

function OnContactSubmit()
{
  console.log("scn",contact)
  let curl = UpdateContactUrl+Math.random()+"&accid="+proxy.$router.currentRoute.value.query.accid
  
  axios.post(curl,contact.value)//默认json格式
    .then((obj) =>{ 
      if( null!=obj.data.code && 0==obj.data.code){         
        alert("提交成功。")
      }
    }).catch((err) => {
        alert('连接服务器失败，请刷新页面尝试！')
    }); 
}

function DelWork(workex_id)
{  
  var i=0;
  for(;i<work.value.length;i++){
    if(workex_id == work.value[i].workex_id){ 
      break
    }
  }  
  if( i<work.value.length){
    //del    
    work.value.splice(i,1)
  }
}

function OnAddWork()
{  
  var obj={}
  obj.accid = proxy.$router.currentRoute.value.query.accid
  //obj.workex_id=
  obj.company_name="name"+(work.value.length+1)
  obj.jobname=""
  obj.job_describe=""
  obj.start_time=""
  obj.end_time=""  
  work.value.push( obj )
}

const myid = computed(() => {
  return (name,index)=>{
    return name+index
  }
})

function OnClickWorkSubmit()
{
  let curl = UpdateWorkUrl+Math.random()+"&accid="+proxy.$router.currentRoute.value.query.accid
  
  axios.post(curl,work.value)//默认json格式
    .then((obj) =>{ 
      if( null!=obj.data.code && 0==obj.data.code){
         console.log("subwork:",work.value) 
        alert("提交成功。")
      }
    }).catch((err) => {
        alert('连接服务器失败，请刷新页面尝试！')
    }); 
}

function DelEducation(education_id)
{  
  var i=0;
  for(;i<education.value.length;i++){
    if(education_id == education.value[i].education_id)
      break
  }
  if( i < education.value.length ){
    //del
    education.value.splice(i,1)
  }  
}


function OnAddEducation()
{
  var obj={}
  obj.accid=proxy.$router.currentRoute.value.query.accid
  obj.name="name"+(education.value.length+1)
  obj.educational_background=""
  obj.start_time=""
  obj.end_time=""
  obj.major=""
  obj.education_describe=""
  education.value.push( obj )
}
function OnEducationSubmit()
{
  let curl = UpdateEducationkUrl+Math.random()+"&accid="+proxy.$router.currentRoute.value.query.accid
  axios.post(curl,education.value)//默认json格式
    .then((obj) =>{
      if( null!=obj.data.code && 0==obj.data.code){
        alert("提交成功。")
      }
    }).catch((err) => {
        alert('连接服务器失败，请刷新页面尝试！')
    }); 
}

function ProvinceChange(innerText)//from 1
{  
  var select = document.getElementById("idProvinceSelect")
  personDetail.value.province_id  = select[select.selectedIndex].innerText
  personDetail.value.province_name = select[select.selectedIndex].label
  GetCity(personDetail.value.province_id  )
}

function CityChange(innerText)
{
  var select = document.getElementById("idCitySelect") 
  console.log( personDetail.value.city_id,personDetail.value.city_name )
  personDetail.value.city_id  = select[select.selectedIndex].innerText
  personDetail.value.city_name  = select[select.selectedIndex].label
}

function RoleChange(innerText)
{
  var select = document.getElementById("idrole")  
  personDetail.value.partnership_id = select[select.selectedIndex].innerText
  personDetail.value.partnership_name = select[select.selectedIndex].label  
}

function GetRolses()
{
  let curl = RolsesControllUrl+Math.random() 
  //console.log("curl111:",curl)
  axios.get(curl)
    .then((obj) => {
      Rolses.value = obj.data
      //console.log('citylist:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
      var select = document.getElementById("idrole")
      var i=0
      var index=0
      for( ; i<Rolses.value.length ;i++ ){
          if( personDetail.value.partnership_id ==  Rolses.value[i].partnership_id )
            break
      }
      if( i < Rolses.value.length ){
        index = i;
      }
      //curRolseIndex = index
      //console.log("cityindex:",index)
      
      setTimeout((select,index) => {
        select[index].selected = true
      }, 1000,select,index);
    }).catch((err) => {
        alert('连接服务器失败，请刷新页面尝试！')
    });
}

function OnClickBaseInfoSubmit()
{  
  if( null==personDetail.value.name || ""==personDetail.value.name){
    alert("昵称不能空！")    
    return
  }  
  if( null==personDetail.value.realName || ""==personDetail.value.realName){
    alert("真实姓名不能空！")
    return
  }  
  if( null==personDetail.value.industry || ""==personDetail.value.industry){
    alert("方向不能空！")
    return
  }
  if( null==personDetail.value.tag || ""== personDetail.value.tag ){
    alert("标签不能空！")
    return
  }

  if( null==personDetail.value.simple_introduce || ""== personDetail.value.simple_introduce ) {
    alert("简介不能空！")
    return
  }

  if( null == personDetail.value.myDetails || ""== personDetail.value.myDetails ){
    alert("详细描述不能空！")
    return
  }
  console.log("pd:",personDetail.value)
  
  let curl = UpdateBaseInfoUrl+Math.random()  
  axios.post(curl,personDetail.value)//默认json格式
    .then((obj) =>{      
      if( null!=obj.data.code && 0==obj.data.code){
        alert("提交成功。")
      }
    }).catch((err) => {
        alert('连接服务器失败，请刷新页面尝试！')
    });
}


function GetCity(province_id){
    let curl = CityControllUrl+Math.random()+"&province_id="+province_id
    console.log("curl111:",curl)
    axios.get(curl)
      .then((obj) => {
        cityList.value = obj.data
        //console.log('citylist:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
        var select = document.getElementById("idCitySelect")
        var i=0
        var index=0
        for( ; i<cityList.value.length ;i++ ){
           if(personDetail.value.city_id ==  cityList.value[i].city_id )
              break
        }
        if(i<cityList.value.length){
          index = i;
        }
        
        setTimeout((select,index) => {
          select[index].selected = true  
          //personDetail.value.city_id = select[index].innerText
          //personDetail.value.city_name = select[index].label
        }, 1000,select,index);
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
}

function GetProvince(){
    let curl = ProVinceUrl+Math.random()
    console.log("gepro:",curl)
    axios.get(curl)
      .then((obj) => {
        provicne.value = obj.data
        console.log("province:",provicne.value)
        var select = document.getElementById("idProvinceSelect")        
        var i=0
        var index=0
        for( ; i<provicne.value.length ;i++ ){
           if(personDetail.value.province_id ==  provicne.value[i].province_id )
              break
        }
        if( i < provicne.value.length ){
          index = i;
        }
        curProvinceIndex = index;
        console.log("id:",personDetail.value.province_id)
        console.log("index:",index)
        setTimeout((select,index) => {
          select[index].selected = true  
          personDetail.value.province_id = select[index].innerText
          personDetail.value.province_name = select[index].label
          GetCity(personDetail.value.province_id)  
        }, 1000,select,index);

      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
}

//生命周期钩子
onMounted(() => {
  function GetPersonDetails(){
    //person base info 
    var accid= proxy.$router.currentRoute.value.query.accid
    let curl = OnePersonDetailsUrl+Math.random()+"&accid="+accid
    
    axios.get(curl)
      .then((obj) => {
        personDetail.value = obj.data
        console.log("personDetail:",personDetail.value)
        GetProvince()
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }
  function GetPrograms(){
    //person base info 
    var accid= proxy.$router.currentRoute.value.query.accid
    let curl = SimpleProgramsUrl+Math.random()+"&accid="+accid    
    
    axios.get(curl)
      .then((obj) => {        
        Object.assign(programs, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
        //console.log('programs:',obj.data)
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }
  function GetContact(){
    var accid= proxy.$router.currentRoute.value.query.accid
    let curl = ContactUrl+Math.random()+"&accid="+accid
    axios.get(curl)
      .then((obj) => {
        contact.value = obj.data //ref貌似深层次递归响应式.
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }
  function GetWork(){
    var accid = proxy.$router.currentRoute.value.query.accid
    let curl = WorkUrl+Math.random()+"&accid="+accid
    axios.get(curl)
      .then((obj) =>{
        work.value = obj.data        
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }
  function GetEducation(){
    var accid = proxy.$router.currentRoute.value.query.accid
    let curl = EducationUrl+Math.random()+"&accid="+accid
    axios.get(curl)
      .then((obj) => {
        education.value = obj.data
        //Object.assign(education, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
        //console.log('education:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }


  GetPersonDetails()
  GetPrograms()
  GetContact()
  GetWork()
  GetEducation()  
  GetRolses()
});//end onMounted
</script>
<template>
<div class="ePersonDetailes">
<br>
<div class="epbase">
  <div class="emyinfoDiv">
    <div class="epname" >
      <span >昵称:</span>
      <input id="idName" type="text" v-model="personDetail.name">
    </div>
    <div class="Realname" >
      <span >真名:</span>
      <input id="idRealName" type="text" v-model="personDetail.realName">
    </div>
    <div class="eindustry">
      <span >方向:</span>
      <input id="idIntrustry" type="text" v-model="personDetail.industry">
    </div>
    <div class="emprovince_name">
      <span >城市:</span>
      <select id="idProvinceSelect" v-on:change="ProvinceChange($event.target.value)">
        <option   v-for="(item,index) in provicne" v-bind:label="item.province_name" >{{item.province_id}}</option>
      </select>
      <select id="idCitySelect" v-on:change="CityChange($event.target.value)">
        <option v-for="(item,index) in cityList" v-bind:label="item.city_name">{{item.city_id}}</option>
      </select>
    </div>
    <div class="erole">
      <span ><a>角色</a>：</span>      
      <select id="idrole" v-on:change="RoleChange($event.target.value)">
        <option   v-for="(item,index) in Rolses" v-bind:label="item.partnership_name" >{{item.partnership_id}}</option>
      </select>
    </div>
    <div class="etag">
      <span >创业标签:</span>
      <input id="idtag" type="text" v-model="personDetail.tag">
    </div>
    <div  class="esimple_introduce">
      <span>个人简介：</span>
      <textarea id="idSimpleIntroduce"  type="text" v-model="personDetail.simple_introduce">
      </textarea>
    </div>
  </div>
  <img class="emyheadpho"  v-bind:src="imgUrl+personDetail.imgurl"/>
</div>
<br>
<div class="emyDetails" >
  <div>详细描述：</div>
  <textarea id="idDetails" class="edetailsDiv" type="text" v-model="personDetail.myDetails"></textarea>
</div>
<br>
<button v-on:click="OnClickBaseInfoSubmit()">提交</button>
<div class="epsplit"></div>

<div id="idwork">工作经历:
  <br>
  <div class="eworkItem" v-for="(item,index) in work" >
    <div>
      <div>公司名称：<input :id="myid('company_name',index)"  type="text" v-model="item.company_name"> </div>
      <div>担任职位：<input :id="myid('jobname',index)"  type="text"  v-model="item.jobname"></div>
      <div>服务时间：<input :id="myid('start_time',index)"  type="text" v-model="item.start_time">--<input :id="myid('end_time',index)"   type="text" v-model="item.end_time"></div>
      <div class="ewcontent">工作内容：<input :id="myid('job_describe',index)"   type="text" v-model="item.job_describe"></div>
      <div class="ewsplititem"></div>
    </div>
    <button v-on:click="DelWork(item.workex_id)" class="wdelete">删除</button>
  </div>
</div>
<br>
<button v-on:click="OnAddWork()">新增工作经历</button>&nbsp;&nbsp;&nbsp;&nbsp;<button v-on:click="OnClickWorkSubmit()">提交</button>

<div class="epsplit"></div>

<div id="ideducation">教育经历:
  <div class="eitem" v-for="(item,index) in education">
    <div>
      <table>
        <tr>
          <td>学校名称:</td>
          <td><input :id="myid('name',index)"   type="text" v-model="item.name"></td>
          <td></td>
        </tr>
        <tr>
          <td>学位名称:</td>
          <td><input :id="myid('educational_background',index)" type="text" v-model="item.educational_background"></td>
          <td></td>
        </tr>
        <tr>
          <td>学习时间:</td>
          <td><input :id="myid('start_time',index)"  type="text" v-model="item.start_time">--</td>
          <td><input :id="myid('end_time',index)"  type="text" v-model="item.end_time"></td>
        </tr>
        <tr>
          <td>专业名称:</td>
          <td><input :id="myid('major',index)"  type="text" v-model="item.major"></td>
          <td></td>
        </tr>
        <tr>
          <td>取得成绩:</td>
          <td><input :id="myid('education_describe',index)"  type="text" v-model="item.education_describe"></td>
          <td></td>
        </tr>
      </table>
      <!-- <div>学校名称:&nbsp;<input  type="text" v-bind:value="item.name"></div>
      <div>学位名称:&nbsp;<input  type="text" v-bind:value="item.educational_background"></div>
      <div>学习时间:&nbsp;<input  type="text" v-bind:value="item.start_time">--<input  type="text" v-bind:value="item.end_time"></div>
      <div>专业名称:&nbsp;<input  type="text" v-bind:value="item.major"></div>
      <div>取得成绩:&nbsp;<input  type="text" v-bind:value="item.education_describe"></div> -->
      <div class="eesplititem"></div>
    </div>
    <button v-on:click="DelEducation(item.education_id)" class="wdelete">删除</button>
  </div>
</div>
<br>
<button v-on:click="OnAddEducation()">新增教育经历</button>&nbsp;&nbsp;&nbsp;&nbsp;<button v-on:click="OnEducationSubmit()">提交</button>
<div class="epsplit"></div>

<div>联系方式:</div>
<div class="ecitem">
  <div class="cweixin"> <span>微信:</span><input  type="text" v-model="contact.weixin" ></div>
  <div class="cother"><span>其他:</span><textarea  type="text" v-model="contact.other"></textarea></div>
</div>
<button v-on:click="OnContactSubmit()">提交</button>
<br>
</div>
</template>
<style>

.edetailsDiv{
  width: 600px;
  height: 200px;
}
.epsplit{
  width: 500px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid red;
}
.epname,.eindustry
,.erole,.etag,.esimple_introduce,.Realname
{
  display: grid;
  grid-template-columns: 100px 200px;
  
}

.emprovince_name
{
  display: grid;
  grid-template-columns: 100px 200px 200px;
}

.ecitem{
margin-left: 10px;
}
.eitem{
  margin-left: 10px;
  display: grid;
  grid-template-columns: 500px 50px;
}
.ewsplititem,.eesplititem{
width: 490px;
margin-bottom: 5px;
border: 1px solid red;
}
.eworkItem{
  margin-left: 10px;
  display: grid;
  grid-template-columns: 500px 50px;
}
.wdelete{
  height: 30px;
}
.ewcontent{

}
.elimg{
width: 180px;
height: 101px;
}

.edetailsDiv{
margin-left: 10px;
margin-right: 10px;
/* border: 1px solid red; */
color: coral;

}
.ePersonDetailes{
clear: both;
min-height: 100vh;
border: 1px solid indianred;
padding-left: 10px;
}
.epbase{
display: grid;  
grid-template-columns: 600px auto;  
}

.emyheadpho{  
width: 180px;
height: 101px;
}
.emyinfoDiv{
  margin-left: 10px;
}

.esimple_introduce{
  clear: both;
}

.cweixin,.cother{
  display: grid;
  grid-template-columns:50px 200px ;
}

</style>
