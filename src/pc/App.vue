<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { onMounted, getCurrentInstance } from "vue";
import Cookies from "js-cookie";

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
    console.log("exit");
    Cookies.set("isLogin", "false");
    window.isLoginFunForHead();
  });
});

window.myp = function () {
  console.log("i am app.vue");
};
</script>

<template>
  <div class="head menu">
    <div class="item logo">111111</div>
    <RouterLink to="/index" class="item index">首页</RouterLink>
    <div id="idreglogin" class="reg_login">
      <RouterLink to="/login" class="item login">登录</RouterLink>
      <RouterLink to="/register" class="item register">注册</RouterLink>
    </div>
    <div id="idheaddiv" class="login_img">
      <div id="idmine" class="item mine">我的</div>
      <div id="idexitlogin" class="item exitlogin">退出</div>
      <div class="item myheadimg" >182...</div>
    </div>
    <RouterLink to="/publish" class="item publish">发布</RouterLink>
  </div>
  <RouterView class="content"> </RouterView>
  <div class="footer menu">
    <div>2222</div>
  </div>
</template>

<style scoped>
.reg_login {
  visibility: visible;
}
.head {
  width: 1280px;
  border: 1px solid red;
  margin-top: 0;
  height: 80px;
  display: block;
  z-index: 9999;
  background-color: aliceblue;
}
.item {
  display: flex;
  margin-right: 20px;
}
.index,
.logo {
  float: left;
}
.register,
.login,
.publish,
.myheadimg,
.exitlogin,.mine {
  float: right;
}

.exitlogin,.mine:hover {
  cursor: pointer;
  color: red;
}
.myheadimg {
  /* border-radius: 50%; */
  /* width: 50px;
  height: 50px; */
  border: 1px solid red;
}
/* content */
/* .content{
  position:relative;
  margin-top: 85px;
  height: 100%;
} */
.footer {
  border: 1px solid red;
  display: flex;
  float: bottom;
  /* left: 0px; */
  bottom: 0px;
  width: 1280px;
  height: 50px;
  text-align: center;
}
</style>
