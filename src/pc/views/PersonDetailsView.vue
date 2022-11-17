

<script setup lang="ts">
    //
    //https://www.npmjs.com/package/js-cookie
    import Cookies from 'js-cookie'
    import {computed,ref,reactive,toRaw,onMounted,getCurrentInstance} from 'vue'
    import { useRoute } from 'vue-router';
    import {
      imgUrl,OnePersonDetailsUrl,
      SimpleProgramsUrl,
      ContactUrl
    } from "../js/common.ts"
    import {SubmitRegister} from "../js/register"
    import axios from 'axios' //dhlu
    const {ctx,proxy} = getCurrentInstance()
    //ref: https://qa.1r1g.com/sf/ask/4601250111/
    let personDetail=reactive({}) //如果对象变了，就失去了响应性。只能把值赋给原有代理。
    let programs = reactive({})
    let contact = reactive({})
    window.myonload =function(){
    }

    // 生命周期钩子
    onMounted(() => {     
      function GetPersonDetails(){
        //person base info 
        var id= proxy.$router.currentRoute.value.query.id
        let curl = OnePersonDetailsUrl+Math.random()+"&accid="+id    
        
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
            console.log('personDetail:',obj.data)
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
      }
      function GetPrograms(){
        //person base info 
        var id= proxy.$router.currentRoute.value.query.id
        let curl = SimpleProgramsUrl+Math.random()+"&accid="+id    
        
        axios.get(curl)
          .then((obj) => {        
            Object.assign(programs, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            console.log('programs:',obj.data)
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
      }
      function GetContact(){
        var id= proxy.$router.currentRoute.value.query.id
        let curl = ContactUrl+Math.random()+"&accid="+id
        axios.get(curl)
          .then((obj) => {        
            Object.assign(contact, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            console.log('contact', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
      }
      GetPersonDetails()
      GetPrograms()
      GetContact()

    });//end onMounted
</script>
<template>
  <div class="PersonDetailes">
    <div class="pbase">
      <!-- <h1>{{ personDetail.imgurl }}</h1> -->
      <img class="headpho"  v-bind:src="imgUrl+personDetail.imgurl"/>      
      <span class="pname">名称：{{personDetail.name}} </span>
      <span class="industry">行业：{{personDetail.industry}}</span>
      <span class="isvip">vip:{{personDetail.isvip}}</span> 
      <div class="activeTime">上次活跃:&nbsp;{{personDetail.activeTime}}</div>        
      <span class="identified">实名认证：{{personDetail.is_identified?"是":"否"}}</span>
      <span class="province_name">城市：{{personDetail.province_name}}.{{personDetail.city_name}}</span>
      <div class="tag">创业标签：{{personDetail.tag}}</div>
    </div>
    
    <div class="simple_introduce">简介：{{personDetail.simple_introduce}}</div>
    <div>我有项目，招合伙人：{{personDetail.need}}</div>
    <div>我没项目，想加入项目：{{personDetail.want_join}}</div>

    <div v-for="(item,index) in programs" >
    <div class="firstdiv">项目[{{item.name}}]：</div>
    <div>正在找[]合伙人：</div>
    <div>1.要求吃苦耐劳。2.有奉献精神。</div>
    <!-- <span></span><span>xxxx</span> <span>共10人</span> <span>想加入</span> -->
    <div class="lstdiv"></div>
    </div>
    
    <div>联系方式:</div>
    <span>wq:xxxx</span>
   
    <div>留言:</div>
    <span>时间：xxxx留言：xxx  </span>
    <span>时间：xxxx留言：xxx  </span>
    <area />
    <button>发送</button>
  </div>
</template>
<style>
.PersonDetailes{
  clear: both;
  min-height: 100vh;
  border: 1px solid indianred;
}
.pbase{
  display: float;  
}

.headpho{
  float: left;
  height: 101px;
  width: 180px;  
  margin-right: 10px;
  border: 1px solid green;
  border-radius: 8%;
}

.province_name,.pname{
  margin-right: 10px;
}
.isvip,province_name,.province_name{
  margin-left: 10px;
}
.activeTime{

}
.tag{

}
.simple_introduce{
  clear: both;
}
.firstdiv{
  margin-top: 10px;
}
.lstdiv{
  margin-bottom: 10px;
}
</style>
