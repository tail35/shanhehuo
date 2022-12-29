
<script setup lang="ts">
//https://www.npmjs.com/package/js-cookie
import Cookies from 'js-cookie'
import { onMounted,getCurrentInstance,computed,ref,reactive,toRaw} from 'vue';

import { useRoute } from 'vue-router';
import {imgUrl,login_urlAction,
  login_urlImg,ProgramDetailControllUrl,
  ProgramImgeControllUrl,PartnerNamesControllUrl
} from "../js/common.ts"
import {SubmitRegister} from "../js/register"
import axios from 'axios' //dhlu
import { objectExpression } from '@babel/types';

const {ctx,proxy} = getCurrentInstance()

var programDetail = reactive({})
var programImgesUrls = ref([])//注意对象数据有区别。
var PartnerNames = ref([])
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
        console.log('programDetail:',obj.data)
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });          
   }
   function GetPartnerNanmes()
   {
    //person base info 
    var programid= proxy.$router.currentRoute.value.query.programid
    let curl = PartnerNamesControllUrl+Math.random()+"&programid="+programid    
    console.log('PartnerNamesurl:',curl)
    axios.get(curl)
      .then((obj) => {
        //如果programDetail 名字错，会导致无法走catch分句。
        PartnerNames.value = obj.data //数组是基本类型。用ref
        console.log('PartnerNames:',obj.data)
      }).catch((err) => {
          alert('连接服务器失败，请刷新页面尝试！')
      });          
   }
   
   GetImgesUrl()
   GetProgramDetail()
   GetPartnerNanmes()
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
    
    <div>xxx 共5人想加入 <button>详情</button>  <button>我想加入</button></div>
    <br>

    <div>本项目由[xxx]发布&nbsp&nbsp<button >联系他 </button></div>
    <div>[xxx]的所有项目如下：</div>
    <div><img /><span>xxxx项目</span></div>
    <div><img /><span>xxxx项目</span></div>
    <div><img /><span>xxxx项目</span></div>
    <br>
    
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
