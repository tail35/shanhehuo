

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
  insertBaseInfoUrl,
  RolsesControllUrl
} from "../js/common.ts"
import {SubmitRegister} from "../js/register"
import axios from 'axios' //dhlu
import PersonMsg from "../components/PersonMsg.vue"
import { parse } from '@babel/parser';


const {ctx,proxy} = getCurrentInstance()
//ref: https://qa.1r1g.com/sf/ask/4601250111/
let personDetail=reactive({}) //如果对象变了，就失去了响应性。只能把值赋给原有代理。
let programs = reactive({})
let contact = reactive({})
let work = reactive({})
let education = reactive({})
let provicne = ref([])
let cityList = ref([])
let CurProvinceCityRole = {}
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

function ProvinceChange(innerText)//from 1
{
  var idProvinceSelect = document.getElementById("idProvinceSelect")
  CurProvinceCityRole.province_id = innerText
  //console.log( idProvinceSelect[index-1].label,idProvinceSelect[index-1].innerText)
  // curProvinceIndex = index-1
  // CurProvinceCityRole.province_id = idProvinceSelect[index-1].innerText
  GetCity(CurProvinceCityRole.province_id )
  console.log("ProvinceChange:",innerText)
}

function CityChange(innerText)
{
  var idCitySelect = document.getElementById("idCitySelect")  
  CurProvinceCityRole.city_id = innerText
  // curCityIndex = index-1
  // CurProvinceCityRole.city_id = idCitySelect[index-1].innerText
  console.log("cityindex:",innerText)
}

function RoleChange(innerText)
{
  var idrole = document.getElementById("idrole")  
  CurProvinceCityRole.role = innerText
  // curRolseIndex = index-1
  // CurProvinceCityRole.role = idrole[index-1].innerText
   console.log("RoleChange:",innerText)
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
          if( CurProvinceCityRole.role ==  Rolses.value[i].partnership_id )
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
  var idName = document.getElementById("idName").value
  if( null==idName || ""==idName){
    alert("昵称不能空！")
  }
  var idRealName = document.getElementById("idRealName").value
  if( null==idRealName || ""==idRealName){
    alert("真实姓名不能空！")
  }

  var idIntrustry = document.getElementById("idIntrustry").value
  if( null==idIntrustry || ""==idIntrustry){
    alert("方向不能空！")
  }
  //省会
  var idrole = document.getElementById("idrole").value
  if( null==idrole || ""== idrole){
    alert("方向不能空！")
  }
  
  var idtag = document.getElementById("idtag").value
  if( null==idtag || ""== idtag ){
    alert("标签不能空！")
  }

  var idSimpleIntroduce = document.getElementById("idSimpleIntroduce").value
  
  if( null==idSimpleIntroduce || ""== idSimpleIntroduce ) {
    alert("简介不能空！")
  }

  var idDetails = document.getElementById("idDetails").value
  if( null == idDetails || ""== idDetails ){
    alert("详细描述不能空！")
  }

  var arr={}
  arr.accid= proxy.$router.currentRoute.value.query.accid
  arr.name = idName
  arr.realName = idRealName
  arr.industry = idIntrustry
  arr.role = idrole
  arr.province_id = CurProvinceCityRole.province_id
  arr.city_id = CurProvinceCityRole.city_id
  arr.tag = idtag
  arr.simple_introduce = idSimpleIntroduce
  arr.myDetails = idDetails

  console.log(arr)

  let curl = insertBaseInfoUrl+Math.random()
  
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

function OnClickWorkSubmit()
{
}

function GetCity(province_id){
    let curl = CityControllUrl+Math.random()+"&province_id="+province_id
    //console.log("curl111:",curl)
    axios.get(curl)
      .then((obj) => {
        cityList.value = obj.data
        //console.log('citylist:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
        var select = document.getElementById("idCitySelect")
        var i=0
        var index=0
        for( ; i<cityList.value.length ;i++ ){
           if(CurProvinceCityRole.city_id ==  cityList.value[i] )
              break
        }
        if(i<cityList.value.length){
          index = i;
        }
        //curCityIndex = index
        //console.log("cityindex:",index)
        
        setTimeout((select,index) => {
          select[index].selected = true  
        }, 1000,select,index);
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
}


function GetCurProvinceCityRole(){
    
    var accid = proxy.$router.currentRoute.value.query.accid
    let curl = CurProvinceCityRoleUrl+Math.random()+"&accid="+accid
    //console.log("curl111:",curl)
    axios.get(curl)
      .then((obj) => {
        Object.assign(CurProvinceCityRole, obj.data)
        var select = document.getElementById("idProvinceSelect")
        //var index = parseInt(CurProvinceCityRole.province_id)
        var i=0
        var index=0
        for( ; i<provicne.value.length ;i++ ){
           if(CurProvinceCityRole.city_id ==  provicne.value[i] )
              break
        }
        if( i < provicne.value.length ){
          index = i;
        }
        curProvinceIndex = index;
        //console.log("provinceindex:",index)
        select[index].selected = true

        GetCity(CurProvinceCityRole.province_id)
        //console.log('CurProvinceCityRole:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
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
        //对ref工作，对reactive没试过。
        // for (const key in obj.data) {
        //   console.log(key, obj.data[key]);
        // }
        // Object.entries(obj.data).forEach(([k, v]) => {
        //   personDetail.value[k]=v  //如果对象变了，就失去了响应性。只能把值赋给原有代理。
        //     //console.log(k, v);
        // });          
        Object.assign(personDetail, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
        //console.log('personDetail:',obj.data)
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
        Object.assign(contact, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
        //console.log('contact', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }
  function GetWork(){
    var accid = proxy.$router.currentRoute.value.query.accid
    let curl = WorkUrl+Math.random()+"&accid="+accid
    axios.get(curl)
      .then((obj) =>{
        Object.assign(work, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
        //console.log('work:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }
  function GetEducation(){
    var accid = proxy.$router.currentRoute.value.query.accid
    let curl = EducationUrl+Math.random()+"&accid="+accid
    axios.get(curl)
      .then((obj) => {
        Object.assign(education, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
        //console.log('education:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }


  function GetProvince(){
    let curl = ProVinceUrl+Math.random()
    axios.get(curl)
      .then((obj) => {
        provicne.value = obj.data
        GetCurProvinceCityRole()
        //console.log('Province:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });
  }
  GetPersonDetails()
  GetPrograms()
  GetContact()
  GetWork()
  GetEducation()
  GetProvince()
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
      <input id="idName" type="text" v-bind:value="personDetail.name">
    </div>
    <div class="Realname" >
      <span >真名:</span>
      <input id="idRealName" type="text" v-bind:value="personDetail.realName">
    </div>
    <div class="eindustry">
      <span >方向:</span>
      <input id="idIntrustry" type="text" v-bind:value="personDetail.industry">
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
      <input id="idtag" type="text" v-bind:value="personDetail.tag">
    </div>
    <div  class="esimple_introduce">
      <span>个人简介：</span>
      <textarea id="idSimpleIntroduce"  type="text" v-bind:value="personDetail.simple_introduce">
      </textarea>
    </div>
  </div>
  <img class="emyheadpho"  v-bind:src="imgUrl+personDetail.imgurl"/>
</div>
<br>
<div class="emyDetails" >
  <div>详细描述：</div>
  <textarea id="idDetails" class="edetailsDiv">{{personDetail.myDetails}}</textarea>
</div>
<br>
<button v-on:click="OnClickBaseInfoSubmit()">提交</button>
<div class="epsplit"></div>

<div>工作经历:</div>
<div class="eworkItem" v-for="(item,index) in work" >
  <div>公司名称：{{item.company_name}}</div>
  <div>担任职位：{{item.jobname}}</div>
  <div>服务时间：{{item.start_time}}--{{item.end_time}}</div>
  <div class="ewcontent">工作内容：{{item.job_describe}}</div>
  <div class="ewsplititem"></div>
</div>
<br>
<button v-on:click="OnClickWorkSubmit()">提交</button>
<div class="epsplit"></div>

<div>教育经历:</div>
<div class="eitem" v-for="(item,index) in education">
  <div>学校名称：{{item.name}}</div>
  <div>学位:{{item.educational_background}}</div>
  <div>学习时间：{{item.start_time}}--{{item.end_time}}</div>
  <div>专业名称：{{item.major}}</div>
  <div>取得成绩：{{item.education_describe}}</div>
  <div class="eesplititem"></div>
</div>
<br>
<button>提交</button>
<div class="epsplit"></div>

<div>联系方式:</div>
<div class="ecitem">
  <div>微信:{{contact.weixin}}</div>
  <div>其他:{{contact.other}}</div>
</div>
<br>
</div>
</template>
<style>
.edetailsDiv{
  width: 600px;
  height: 200px;
}
.epsplit{
  width: 400px;
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
}
.ewsplititem,.eesplititem{
width: 300px;
margin-bottom: 5px;
border: 1px solid red;
}
.eworkItem{
margin-left: 10px;
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


</style>
