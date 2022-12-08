
<script setup lang="ts">
//https://www.npmjs.com/package/js-cookie
import Cookies from 'js-cookie'
import { onMounted,getCurrentInstance,computed,ref,reactive,toRaw} from 'vue';

import { useRoute } from 'vue-router';
import {imgUrl,login_urlAction,
  login_urlImg,ProgramDetailControllUrl,
  ProgramImgeControllUrl
} from "../js/common.ts"
import {SubmitRegister} from "../js/register"
import axios from 'axios' //dhlu
import { objectExpression } from '@babel/types';

const {ctx,proxy} = getCurrentInstance()
var programDetail = reactive({})
var programImgesUrls = ref([])//注意对象数据有区别。
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

// 生命周期钩子
onMounted(() => {
  function GetImgesUrl()
  {
    //person base info 
    var programid= proxy.$router.currentRoute.value.query.programid
    let curl = ProgramImgeControllUrl+Math.random()+"&programid="+programid    
    console.log('iurl:',curl)
    axios.get(curl)
      .then((obj) => {
        programImgesUrls.value = obj.data //数组是基本类型。用ref
        console.log('programImgesUrls:',programImgesUrls)
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
   GetImgesUrl()
   GetProgramDetail()
});
</script>
<template>
  <div class="PersonDetailes">     
    <div>
    <img v-bind:src="myurl(programImgesUrls)" id="idProgramImg"  class="programimg" />    
    </div>
    
    <div>{{programDetail.name}}</div>
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
</style>
