

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
      MessageUrl
    } from "../js/common.ts"
    import {SubmitRegister} from "../js/register"
    import axios from 'axios' //dhlu
    const {ctx,proxy} = getCurrentInstance()
    //ref: https://qa.1r1g.com/sf/ask/4601250111/
    let personDetail=reactive({}) //如果对象变了，就失去了响应性。只能把值赋给原有代理。
    let programs = reactive({})
    let contact = reactive({})
    let work = reactive({})
    let education = reactive({})
    let message = reactive({})
    
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
            //console.log('personDetail:',obj.data)
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
      function GetWork(){
        var id= proxy.$router.currentRoute.value.query.id
        let curl = WorkUrl+Math.random()+"&accid="+id
        axios.get(curl)
          .then((obj) =>{
            Object.assign(work, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            console.log('work:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
      }
      function GetEducation(){
        var id= proxy.$router.currentRoute.value.query.id
        let curl = EducationUrl+Math.random()+"&accid="+id
        axios.get(curl)
          .then((obj) => {
            Object.assign(education, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            console.log('education:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
      }
      function GetEducation(){
        var id= proxy.$router.currentRoute.value.query.id
        let curl =MessageUrl +Math.random()+"&accid="+id
        axios.get(curl)
          .then((obj) => {
            Object.assign(message, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            console.log('message:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
      }
      GetPersonDetails()
      GetPrograms()
      GetContact()
      GetWork()
      GetEducation()

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
    <div>正在找[{{item.partnership_name}}]合伙人：</div>
    <div>{{item.join_condition}}。</div>
    <!-- <span></span><span>xxxx</span> <span>共10人</span> <span>想加入</span> -->
    <div class="lstdiv"></div>
    </div>

    <div>工作经历:</div>
    <div v-for="(item,index) in work" >    
    <div>公司名称：{{item.company_name}}</div>
    <div>担任职位：{{item.jobname}}</div>
    <div>服务时间：{{item.start_time}}--{{item.end_time}}</div>
    <div>工作内容：{{item.job_describe}}</div>
    <br>
    </div>

    <div>教育经历:</div>
    <div v-for="(item,index) in education" >    
    <div>学校名称：{{item.name}}</div>
    <div>学位:{{item.educational_background}}</div>
    <div>学习时间：{{item.start_time}}--{{item.end_time}}</div>
    <div>专业名称：{{item.major}}</div>
    <div>取得成绩：{{item.education_describe}}</div>
    <br>
    </div>

    <div>联系方式:</div>
    <div>微信:{{contact.weixin}}</div>
    <div>qq:{{contact.qq}}</div>
    <div>电话:{{contact.tel}}</div>
    <div>网站:{{contact.web}}</div>
    <div>微博:{{contact.weibo}}</div>
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
.idmessage{
  width: 400px;
  height:50px;
  border: 1px solid red;
  display: block;
  margin-bottom: 10px;
}
.msg_head
{
  width: 20px;
  height: 11px;
  border: 1px solid greenyellow;
  margin-right: 10px;
}
.mname{
  margin-right: 10px;
}
.msg_message{
  margin-left: 20px;
}
</style>
