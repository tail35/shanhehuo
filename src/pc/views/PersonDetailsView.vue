

<script setup lang="ts">
    //
    //https://www.npmjs.com/package/js-cookie
    import Cookies from 'js-cookie'
    import {computed,ref,reactive,toRaw,onMounted,getCurrentInstance} from 'vue'
    import { useRoute } from 'vue-router';
    import {imgUrl,OnePersonDetailsUrl} from "../js/common.ts"
    import {SubmitRegister} from "../js/register"
    import axios from 'axios' //dhlu
    const {ctx,proxy} = getCurrentInstance()
    //ref: https://qa.1r1g.com/sf/ask/4601250111/
    let personDetail=reactive({}) //如果对象变了，就失去了响应性。只能把值赋给原有代理。
  
    window.myonload =function(){
    }

    // 生命周期钩子
    onMounted(() => {     
      //person base info 
      var id= proxy.$router.currentRoute.value.query.id
      let curl = OnePersonDetailsUrl+Math.random()+"&accid="+id    
      console.log('curl:',curl)   
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

        }).catch((err) => {
            alert('连接服务器失败，请刷新页面尝试！')
        });
    });//end onMounted
</script>
<template>
  <div class="PersonDetailes">
    <div class="phitem">
      <!-- <h1>{{ personDetail.imgurl }}</h1> -->
      <img class="ppphoto"  v-bind:src="imgUrl+personDetail.imgurl"/>
      <div class="ppitem ponediv">
        <span class="peitem pwname">名称：xxx <span class="isvip">vip</span> <span class="huoyue">上次活跃时间:2022-09-29</span></span>
        <span class="peitem pshanchang" >擅长：<span>xxxx</span></span>
        <span class="petiem pbiaoqian">标签：<span>xxxx</span></span>
        <span class="peitem pjingyan">经验：</span>
        <span >xxxx</span>
      </div>
    </div>
    <div>项目描述：</div>
    <span>1.xxx。2.xxxx 3.xxxx</span>
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

  min-height: 100vh;
  border: 1px solid indianred;
}
.pjingyan{
  clear: both;
  display: block;
}
.pphoto{
  width: 180px;
  height: 101px;
}
</style>
