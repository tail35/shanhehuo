<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { onMounted, getCurrentInstance } from "vue";
import Cookies from "js-cookie";
const {ctx,proxy} = getCurrentInstance()

function MyResize() {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
}

window.isLoginFunForHead = function () {
  const isLogin = Cookies.get("isLogin");

  if ("true" == isLogin) {
    document.getElementById("idreglogin").style.visibility = "hidden";
    document.getElementById("idheaddiv").style.visibility = "visible";
  } else {
    document.getElementById("idreglogin").style.visibility = "visible";
    document.getElementById("idheaddiv").style.visibility = "hidden";
  }
};

MyResize();

onMounted(() => {
  window.isLoginFunForHead();

  document.getElementById("idexitlogin").addEventListener("click", () => {    
    Cookies.set("isLogin", "false");
    window.isLoginFunForHead();
  });

  //default use home
  const {ctx,proxy} = getCurrentInstance()
  proxy.$router.push({name:'home',params: {id:'1'}})
});

window.myp = function () {
  
}
function MyInfoClick(){
  proxy.$router.push({name:'MyInfoEditView',params: {id:'1'}})//query url后跟id,params 是post 刷新丢失id
}
function MyProgramClick(){
  proxy.$router.push({name:'MyProgramEditView',params: {id:'1'}})//query url后跟id,params 是post 刷新丢失id
}

</script>

<template>
  <!-- <div class="maindiv"> -->
    <div class="head menu">
      
      <!-- left menu -->
      <div class="item logo">111111</div>
      <RouterLink to="/index" class="item index">合伙人</RouterLink>
      <RouterLink to="/ProgramList" class="item program">项目</RouterLink>
      <!-- left menu end -->

      <!-- right menu if not login -->
      <div id="idreglogin" class="reg_login">
        <RouterLink to="/login" class="item login">登录</RouterLink>
        <RouterLink to="/register" class="item register">注册</RouterLink>
      </div>

      <!-- if login -->
      
      <div id="idheaddiv" class="iflogin">
        <div id="idtest" class="item test">test</div>
        <div class="item myinfo">
          <div id="idmine" class="mine">我的</div>
          <div class="my_dropmenu">
            <span v-on:click="MyInfoClick">我的信息</span>
            <span v-on:click="MyProgramClick">我的项目</span>
          </div>
        </div>
        
        <div id="idexitlogin" class="item exitlogin">退出</div>
        <div class="item myheadimg" >182...</div>
        <RouterLink to="/publish" class="item publish">发布</RouterLink>
      </div>
      <!-- if login end -->
    </div>
    <RouterView class="content"> </RouterView>
    <div class="footer menu">
      <div>2222</div>
    </div>
<!-- </div> -->
</template>

<style scoped>
.reg_login {
  visibility: visible;
}
.head {
  display: block;
  height: 80px; 
  width: 1280px;
  border: 1px solid red;
  margin-top: 0;     
  background-color: aliceblue;
}
.item {
  display: flex;
  margin-right: 20px;
}
.index,
.logo,
.program
 {
  float: left;
}
.myinfo,
.test,
.register,
.login,
.publish,
.myheadimg,
.exitlogin {
  float: right;
}

.exitlogin:hover,.mine:hover,.myheadimg:hover {
  cursor: pointer;
  color: red;
}
.myheadimg {
  /* border-radius: 50%; */
  /* width: 50px;
  height: 50px; */
  /* border: 1px solid red; */
}
/* content */
/* .content{
  position:relative;
  margin-top: 85px;
  height: 100%;
} */
.footer {
  border: 1px solid red;
  width: 1280px;
  height: 50px;
  margin-top: 40px;
  text-align: center;
}


.myinfo{
  /* 行内元素其内部元素不收到float影响，而在底部换行*/
  display: inline-block;
}
.my_dropmenu {  
  
  display: none;
 }
 .my_dropmenu span{
   display: block;   
   margin-top: 10px;
 }

 .my_dropmenu span:hover{
    cursor: pointer;
    color: green;    
 }

.myinfo:hover .my_dropmenu {  
  display: block;
} 

/*后面元素清楚浮动样式,不然菜单栏样式会影响后面的内容*/
 .content:after{
  clear: both;
}
</style>
