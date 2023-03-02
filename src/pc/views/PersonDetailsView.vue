

<script setup lang="ts">
    //
    //https://www.npmjs.com/package/js-cookie
    import Cookies from 'js-cookie'
    import {computed,ref,
      reactive,toRaw,
      onMounted,getCurrentInstance
      } from 'vue'
    import { useRoute } from 'vue-router';
    import {
      imgUrl,OnePersonDetailsUrl,
      SimpleProgramsUrl,
      ContactUrl,
      WorkUrl,
      EducationUrl,
      PersonMessageUrl,
      InsertPersonMsgUrl,
      personMsgPagesNumUrl
    } from "../js/common.ts"
    import {SubmitRegister} from "../js/register"
    import axios from 'axios' //dhlu
    import PersonMsg from "../components/PersonMsg.vue"


    const {ctx,proxy} = getCurrentInstance()
    //ref: https://qa.1r1g.com/sf/ask/4601250111/
    let personDetail=reactive({}) //如果对象变了，就失去了响应性。只能把值赋给原有代理。
    let programs = reactive({})
    let contact = reactive({})
    let work = reactive({})
    let education = reactive({})
    let message = ref([])//数组用ref。 x.value=obj.data.
    var PersonMsgPageCur=reactive({value:1})
    var pmpagesNum=reactive({})
    

    window.myonload =function(){
    }

  //   function JumpToPage(page){
  //   proxy.$router.push({name:'HomeView',query: {pageindex:page}})
  //   proxy.$forceUpdate()
  //   UpdateKey()
  // }

  function isNumber(theObj) {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(theObj)) {
        return true;
      }
  return false;
}


    function GetPageNum() {
    var accid = proxy.$router.currentRoute.value.query.accid
    var myurl = personMsgPagesNumUrl+Math.random() +"&toaccid="+accid
    //console.log(pagesNumUrl)
    axios.get( myurl )
        .then((obj) => {
          Object.assign(pmpagesNum,obj.data)
          //console.log('pagesNum:',pagesNum)
          //flush
        }).catch((err) => {
            alert('连接服务器失败，请刷新页面尝试！')
        });
    }


    function GetMessage(pageindex){
        if(null == pageindex){
          pageindex = Cookies.get("PersonMsgPageindex")
          if(null == pageindex){
            pageindex = 1;
          }
        }
        Cookies.set("PersonMsgPageindex",pageindex)
        PersonMsgPageCur.value = pageindex;
    
        var accid = proxy.$router.currentRoute.value.query.accid
        let curl =PersonMessageUrl +Math.random()+"&accid="+accid+"&page="+pageindex
        axios.get(curl)
          .then((obj) => {                     
            message.value = obj.data                    
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
}
    function OnSendMsg()
    {
      
      var idMsg = document.getElementById("idMsg")
      if (null==idMsg || ""== idMsg.value ){
        return
      }

      let curl = InsertPersonMsgUrl+Math.random()
      //axios.post(curl,idMsg.value,{ headers: {'Content-Type': 'text/plain'} })
      var arr={};
      arr.toaccid=proxy.$router.currentRoute.value.query.accid
      arr.fromaccid=Cookies.get("myaccid")
      arr.message = idMsg.value
            
      //var tmp = JSON.stringify(arr)
      //axios data 必须是array对象，不要自己string化。
      //插入聊天数据
      axios.post( curl,arr)
          .then((obj) => {
            //console.log("obj:",obj.data)
              if(0 == obj.data.code){
                //reload message.                
                GetMessage(1);
              }            
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
    }

    function MylImgClick(item){
      
      proxy.$router.push({name:'ProgramDetailsView',query:{accid:item.accid,programid:item.programid}})//query: url后跟id,params: 是post 刷新丢失id
      //console.log("11111",item)
    }
    //生命周期钩子
    onMounted(() => {
      function GetPersonDetails(){
        //person base info 
        var accid= proxy.$router.currentRoute.value.query.accid
        let curl = OnePersonDetailsUrl+Math.random()+"&accid="+accid
        
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
            //console.log('personDetail:',obj.data)
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
      }
      function GetPrograms(){
        //person base info 
        var accid= proxy.$router.currentRoute.value.query.accid
        let curl = SimpleProgramsUrl+Math.random()+"&accid="+accid    
        
        axios.get(curl)
          .then((obj) => {        
            Object.assign(programs, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            console.log('programs:',obj.data)
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
      }
      function GetContact(){
        var accid= proxy.$router.currentRoute.value.query.accid
        let curl = ContactUrl+Math.random()+"&accid="+accid
        axios.get(curl)
          .then((obj) => {        
            Object.assign(contact, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            //console.log('contact', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
      }
      function GetWork(){
        var accid = proxy.$router.currentRoute.value.query.accid
        let curl = WorkUrl+Math.random()+"&accid="+accid
        axios.get(curl)
          .then((obj) =>{
            Object.assign(work, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            //console.log('work:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
      }
      function GetEducation(){
        var accid = proxy.$router.currentRoute.value.query.accid
        let curl = EducationUrl+Math.random()+"&accid="+accid
        axios.get(curl)
          .then((obj) => {
            Object.assign(education, obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
            console.log('education:', obj.data)//如果是ref 不工作。只有reactive 工作。对象需要这样，数组不需要。参见HomeView.vue
          }).catch((err) => {
              alert('连接服务器失败，请刷新页面尝试！')
          });
      }

      var idpmpageinput = document.getElementById("idpmpageinput")  
      idpmpageinput.onblur = function(){
        var page = idpmpageinput.value
        if( null == page){
          return
        }
        if(false == isNumber(page) || "0"==page){
          alert('只能输入正整数!')
          return
        }
        console.log("page111:",page)
        GetMessage(page)
      }


      GetPersonDetails()
      GetPrograms()
      GetContact()
      GetWork()
      GetEducation()
      GetMessage(1)
      GetPageNum()

    });//end onMounted
</script>
<template>
  <div class="PersonDetailes">
    <br>
    <div class="pbase">      
      <img class="myheadpho"  v-bind:src="imgUrl+personDetail.imgurl"/>
      <div class="myinfoDiv">
        <span class="pname">名称：{{personDetail.name}} </span>
        <span class="industry">方向：{{personDetail.industry}}</span>
        <span class="isvip">vip:{{personDetail.isvip}}</span>
        <div class="activeTime">上次活跃:&nbsp;{{personDetail.activeTime}}</div>
        <span class="identified">实名认证：{{personDetail.is_identified?"是":"否"}}</span>
        <span class="province_name">城市：{{personDetail.province_name}}.{{personDetail.city_name}}</span>
        <span class="role">&nbsp;&nbsp;<a>角色</a>：{{personDetail.partnership_name}}</span>
        <div class="tag">创业标签：{{personDetail.tag}}</div>
        <div class="simple_introduce">个人简介：{{personDetail.simple_introduce}}</div>
      </div>
    </div>
    <br>
    
    <div class="myDetails">
      <div>详细描述：</div>
      <div class="detailsDiv">{{personDetail.myDetails}}</div>
    </div>

    <br>
    <div>
    他的项目列表：
    </div>
    <div class="myprogramlist" >
      <div class="myprogramItem" v-for="(item,index) in programs" v-on:click="MylImgClick(item)"  >
        <img class="limg" v-bind:src="imgUrl+item.imgurl" />
        <div class="firstdiv">项目名称：{{item.name}}</div>
      </div>
    </div>
    <!-- <table>
      <tr>
        <td class="myprogramtable" v-for="(item,index) in programs">
          <div class="firstdiv">项目[{{item.name}}]：</div>
          <div>正在找[{{item.partnership_name}}]</div>
          <div>{{item.join_condition}}</div>
        </td>
      </tr>
    </table> -->
    <br>

    <div>工作经历:</div>
    <div class="workItem" v-for="(item,index) in work" >
      <div>公司名称：{{item.company_name}}</div>
      <div>担任职位：{{item.jobname}}</div>
      <div>服务时间：{{item.start_time}}--{{item.end_time}}</div>      
      <div class="wcontent">工作内容：{{item.job_describe}}</div>
      <div class="wsplititem"></div>
    </div>
    <br>
    <div>教育经历:</div>
    <div class="eitem" v-for="(item,index) in education">
      <div>学校名称：{{item.name}}</div>
      <div>学位:{{item.educational_background}}</div>
      <div>学习时间：{{item.start_time}}--{{item.end_time}}</div>
      <div>专业名称：{{item.major}}</div>
      <div>取得成绩：{{item.education_describe}}</div>
      <div class="esplititem"></div>
    </div>
    <br>

    <div>联系方式:</div>
    <div class="citem">
      <div>微信:{{contact.weixin}}</div>
      <div>其他:{{contact.other}}</div>
    </div>
    <br>
    
    <div>留言:</div>
    <button v-on:click="OnSendMsg()">发送</button>
    <textarea id="idMsg" class='idmessage'/>
    <!-- //留言列表组件 -->
    <PersonMsg :message="message" ></PersonMsg>
    <div class="pmpagetable">
      <ul class="pmpagination">
        当前留言是第<a class="pmcurpagea">{{PersonMsgPageCur.value}}</a>页,&nbsp;
        <span>共{{pmpagesNum.PagesNum}}页,&nbsp;跳转到&nbsp;</span>
        <input id="idpmpageinput" class="pmpageinput" v-bind:value="PersonMsgPageCur.value" /> <span>页</span>
      </ul>
      <div class="pmpageright">
      </div>
    </div>

  </div>
</template>
<style>

.pmcurpagea{
  color: red;
}
.pmpageinput{
  width: 60px;
}
.pmpagetable{
  display: grid;
  grid-template-columns:auto auto;
  border: 1px solid red;
}

.citem{
  margin-left: 10px;
}
.eitem{
  margin-left: 10px;
}
.wsplititem,.esplititem{
  width: 300px;
  margin-bottom: 5px;
  border: 1px solid red;
}
.workItem{
  margin-left: 10px;
}
.wcontent{
  
}
.limg{
  width: 180px;
  height: 101px;
}
.myprogramlist{
  display: grid;
  grid-template-columns:repeat(auto-fill,200px);
}
.myprogramItem{
  /* border:1px solid red; */
  margin-left: 10px;
}
.myprogramItem:hover{
  border:1px solid red; 
}
.detailsDiv{
  margin-left: 10px;
  margin-right: 10px;
  /* border: 1px solid red; */
  color: coral;
  
}
.PersonDetailes{
  clear: both;
  min-height: 100vh;
  border: 1px solid indianred;
  padding-left: 10px;
}
.pbase{
  display: grid;  
  grid-template-columns: 180px auto;  
}

.myheadpho{  
  width: 180px;
  height: 101px;
}
.myinfoDiv{
  margin-left: 10px;
}

.province_name,.pname{
  margin-right: 10px;
}
.isvip,province_name,.province_name{
  margin-left: 10px;
}
.activeTime{

}
.tag{

}
.simple_introduce{
  clear: both;
}
.firstdiv{
  margin-top: 10px;
}

.idmessage{
  width: 400px;
  height:50px;
  border: 1px solid red;
  display: block;
  margin-bottom: 10px;
}

</style>
