<template>
  <div class="PersonDetailes">     
    <div>
    <img style="width:640px;heidht:480px"/>
    </div>
    <div>绘本项目</div>
    <span>北京|300~500万|20人</span> <span>200人浏览</span> <span>2022-10-11发布</span>
    <div>项目很好，市场不想后效</div>
    <div>本项目找技术合伙人</div>
    <span>牛逼技术</span>
    <div>本项目找营销合伙人</div>
    <span>牛逼营销技术</span>
    
    <div>我想加入：</div>
    <span>xxxxx</span>
    <div>我的项目</div>
    <img /> <span>xxxx项目</span>
    <img /><span>xxxx项目</span>
    <img /><span>xxxx项目</span>
    <button >联系他 </button>
    <div>留言:</div>
    <span>时间：xxxx留言：xxx  </span>
    <span>时间：xxxx留言：xxx  </span>
    <area />
    <button>发送</button>
  </div>
</template>

<script setup lang="ts">
    //https://www.npmjs.com/package/js-cookie
    import Cookies from 'js-cookie'
    import { onMounted,getCurrentInstance,computed,ref,reactive,toRaw} from 'vue';
   
    import { useRoute } from 'vue-router';
    import {login_urlAction,
      login_urlImg,ProgramDetailControllUrl,
      ProgramImgeControllUrl
    } from "../js/common.ts"
    import {SubmitRegister} from "../js/register"
    import axios from 'axios' //dhlu

    const {ctx,proxy} = getCurrentInstance()
    let program = reactive({})
    let programImgesUrls = reactive({})
    window.myonload =function(){

    }

    // 生命周期钩子
    onMounted(() => {
      function GetImgesUrl()
      {
        //person base info 
        var programid= proxy.$router.currentRoute.value.query.programid
        let curl = ProgramImgeControllUrl+Math.random()+"&programid="+programid    
        
        axios.get(curl)
          .then((obj) => {        
            Object.assign(programImgesUrls, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            console.log('programImgesUrls:',obj.data)
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });   
      }
       function GetProgram()
       {
        //person base info 
        var programid= proxy.$router.currentRoute.value.query.programid
        let curl = ProgramDetailControllUrl+Math.random()+"&programid="+programid    
        
        axios.get(curl)
          .then((obj) => {        
            Object.assign(program, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            console.log('program:',obj.data)
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });          
       }
       GetImgesUrl()
       GetProgram()

    });
</script>
<style>
.PersonDetailes{

  min-height: 100vh;
  border: 1px solid indianred;
}
.pjingyan{
  clear: both;
  display: block;
}

</style>
