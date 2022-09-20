<template>
  <div class="divregister">     
     <form id="idform" class="myform mytable" action="https://my1.cow8.cn:448/register?v=1" method="Post" enctype="multipart/form-data" name="myregister" target="frameName">
      <div class="left cell item1">*手机：</div>  <input class="right cell item2" type="text" name="phone">
      <div class="left cell item3">*密码：</div>  <input class="right cell item4" type="text" name="password">
      <div class="left cell item4">*确认：</div>  <input class="right cell item6" type="text" name="confirm">
      <div class="left cell item7">*验证码：</div>  <input class="right cell item8" type="text" name="checkcode"> <img id="idimg" onclick="OnClickImg()" class="left cell item9"  />
      <input class=" cell item10" type="submit" value="提交" /> 
    </form>
  </div>
  <iframe src="" frameborder="0" name="frameName"></iframe>
</template>

<script setup lang="ts">
    window.onload =function(){      
      var url= "https://my1.cow8.cn:448/register?v="    
      var myfrom = document.getElementById("idform")      
      myfrom.action = url+Math.random()

      var img = document.getElementById("idimg")
      img.src =url+Math.random()
    }
    window.OnClickImg = function OnClickImg()
    {
      var img = document.getElementById("idimg")
      img.src ="https://my1.cow8.cn:448/checkcode?v="+Math.random()
    }

    import {SubmitRegister} from "../js/register"
    SubmitRegister()
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
  width: 50px;
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



</style>
