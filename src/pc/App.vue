<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
function MyResize(){
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01
      console.log(vh);
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
}
MyResize()
</script>

<template>  
  <div class="head menu">
      <RouterLink to="/" class="item index">首页</RouterLink>
      <RouterLink to="/about" class="item register">注册</RouterLink>
      <RouterLink to="/" class="item login">登录</RouterLink>
  </div>
  <RouterView class="content" > </RouterView>
  <div class="footer menu">
      2222
  </div>
</template>

<style scoped>
.head{  
  width: 1280px;
  border: 1px solid red;
  margin-top: 0;
  height: 80px;
  display: block;
  z-index: 9999;
  background-color: aliceblue;
}
.item{
  display: flex;
}
.index,.register{
  float: left;
}
.login{
  float:right;
}
/* content */
/* .content{
  position:relative;
  margin-top: 85px;
  height: 100%;
} */
.footer{
  border: 1px solid red;
  display: flex;
  float: bottom;
  /* left: 0px; */  
  bottom: 0px;
  width: 1280px;
  height: 50px;
  text-align:center;
  color:#fff;
  ackground-color: #000;
}

</style>
