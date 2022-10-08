<script setup lang="ts">
import TheWelcome from '@/pc/components/TheWelcome.vue'
import {ref,toRaw,onMounted,getCurrentInstance} from 'vue'
const {ctx,proxy} = getCurrentInstance()
import axios from 'axios' //dhlu
import {personListUrl} from "../js/common.ts"

//console.log('id:',proxy.$route.query.id )
isLoginFunForHead()
window.myp();
var persones=ref([])

onMounted(()=>{
  axios
        //3.1url地址
        .get(personListUrl+Math.random())
        //3.2成功时回调函数
        .then((obj) => {
          var myObj = obj.data
          //persones = ref(myObj)
          //console.log("wo:",persones.value )
          // var item1 = {}
          // item1.name = "111"
          // var item2 = {}
          // item2.name = "222"
          // persones.value[0]=item1;
          // persones.value[1]=item2;
        })
        //3.3失败时回调函数
        .catch((err) => {
            alert('连接服务器失败，请刷新页面尝试！')
        });
//   setTimeout(() =>{
//     var item1 = {}
//     item1.name = "111"
//     var item2 = {}
//     item2.name = "222"
//     persones.value[0]=item1;
//     persones.value[1]=item2;
// }, 2000);
})
</script>

<template>
  <main class="hmain">
    <!-- <div v-for="item in persones">
    {{item.name}}
    </div> -->
    <div v-for="(item,index) in persones" >
      <div class="hitem">
        <img class="pphoto" />
        <div class="pitem onediv">
          <span class="eitem wname">{{item.name}} <span class="isvip">vip</span> <span class="huoyue">上次活跃时间:2022-09-29</span></span>
          <span class="eitem shanchang" >擅长：<span>xxxx</span></span>
          <span class="eitem jingyan">经验：<span>xxxx</span></span>
          <span class="etiem biaoqian">标签：<span>xxxx</span></span>
        </div>
      </div>
    </div>

    <!-- <div class="hitem">
      <img class="pphoto" />
      <div class="pitem onediv">
        <span class="eitem wname">名称：xxx <span class="isvip">vip</span> <span class="huoyue">上次活跃时间:2022-09-29</span></span>
        <span class="eitem shanchang" >擅长：<span>xxxx</span></span>
        <span class="eitem jingyan">经验：<span>xxxx</span></span>
        <span class="etiem biaoqian">标签：<span>xxxx</span></span>
      </div>
    </div>
    <div>123456</div> -->
  </main>
</template>
<style>
  .isvip{
    font: 1em sans-serif;
    margin-left: 10px;
    visibility: collapse;
  }
  .huoyue{
    margin-left: 10px;
  }
 .eitem{
 }
.pitem{
  flex-direction: column;
  margin-left: 10px;
}
.hmain{
  height: 100vh;
}
.hitem{
  display: flex;
  margin-top: 10px;
  border: 1px solid black;
}
.pphoto,.pitem{
  display: flex;
  float: left;  
  border: 1px solid red;
}
.pphoto{
  width: 180px;
  height: 101px;
}
.onediv{
  width:100%;
  height: 101px;
}

</style>
