<template>
  <div class="divregister">     
     <form id="idform" class="myform mytable"  method="Post" enctype="multipart/form-data" name="myregister" target="frameName">
      <div class="left cell item1">*手机：</div>  <input id="idphone" class="right cell item2" type="text" name="phone" >
      <div class="left cell item3">*密码：</div>  <input id="idpwd" class="right cell item4" type="text" name="password">
      <div class="left cell item4">*确认：</div>  <input id="idconfigpwd" class="right cell item6" type="text" name="confirm">
      <div class="left cell item7">*验证码：</div>  <input class="right cell item8" type="text" name="checkcode"> <img   id="idimg" onclick="OnClickImg()" class="left cell item9"  />
      <input id="stokenid" type="text" name="stoken" hidden>
      <button class=" cell item10" type="button" onclick="MySubmitButton()"  >提交</button>
    </form>
    <iframe class="iframe" id="myIframe1" name="frameName" >
    </iframe>
  </div>  
</template>

<script setup lang="ts">
    //https://www.npmjs.com/package/js-cookie
    import Cookies from 'js-cookie'
    import { onMounted } from 'vue';
    import {urlAction,urlImg} from "../js/common.ts"
    import {SubmitRegister} from "../js/register"
    //判断手机号是否合法
    window.isPhoneNumber = function(tel) {
        var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
        return reg.test(tel);
    }

    window.MySubmitButton = function()
    {
      //phoneNumber
      var myvalue = document.getElementById('idphone').value
      if(!myvalue){
        alert("手机号码不能空!")
        return
      }
      // if( 11!=myvalue.length || !isPhoneNumber(myvalue)){
      //   alert('请输入正确的手机号码')
      //   return
      // }
      //password
      var pwd = document.getElementById('idpwd').value
      if(!pwd){
        alert("密码不能空!")
        return
      }
      var confirmMyvalue = document.getElementById('idconfigpwd').value
      if(!confirmMyvalue){
        alert("确认密码不能空!")
        return
      }
      if(confirmMyvalue != pwd ){
        alert("两次输入密码不相等!")
        return
      }
      //
            
      var idfrom = document.getElementById('idform')

      document.getElementById('stokenid').setAttribute("value",Cookies.get('stoken'))

      idfrom.submit()
    }

    window.RegisterResult = function(data)
    {
      //console.log(data)      
      alert(data.msg)      
    }
    
    window.addEventListener("message", function(e){        
        if( e.data.action == "res"){
          window.RegisterResult(e.data)
        }
    },false);//跨域通信，子通知父页面.不能少false,不然收不到。

    window.myonload =function(){

      var myfrom = document.getElementById("idform")
      myfrom.action = urlAction+Math.random()

      window.OnClickImg()
    }
    window.OnClickImg = function()
    {
      var img = document.getElementById("idimg")      
      img.src = urlImg + Math.random() +"&stoken="+Cookies.get('stoken')
      
    }
    SubmitRegister()
    // 生命周期钩子
    onMounted(() => {
      window.myonload(); }
    );
</script>
<style>
.mytable{
  display: grid;
  grid-template-columns: auto auto;
  grid-auto-rows: 40px;
  width: 280px;
  height: 200px;
  margin: auto;
  margin-top: 200px;
  /* border: 1px solid lightcoral; */
}

.left{
  text-align: right;
  vertical-align: center;
  width: 80px;
}
.cell{
  height: 25px;
  /* border: 1px solid blue; */
}
.item9{
  width: 200px;
  height: 73px;
  margin: 0 auto;
  padding: 0;
}

.divregister {
    margin: 0 auto;    
    min-height: 100vh;    
    /* border: 1px solid greenyellow; */
  }
  
  .item9:hover{
    cursor: pointer;
  }

.iframe{  
  frameborder:"0";
  padding: 0;
  margin: 0;
  width:0;
  height:0;
}

</style>
