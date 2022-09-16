<template>
  <div class="divregister">     
     <form class="myform mytable" action="register">
      <div class="left cell item1">*手机：</div>  <input class="right cell item2" type="text" name="phone">
      <div class="left cell item3">*密码：</div>  <input class="right cell item4" type="text" name="password">
      <div class="left cell item4">*确认：</div>  <input class="right cell item6" type="text" name="confirm">
      <div class="left cell item7">*验证码：</div>  <input class="right cell item8" type="text" name="checkcode"> <div class="left cell item9">验证码</div>
      <input class=" cell item10" type="submit" value="提交"> 
    </form>
  </div>
</template>

<style>
.mytable{
  display: grid;  
  grid-template-columns: auto auto;
  grid-auto-rows : 40px;  
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

</style>
