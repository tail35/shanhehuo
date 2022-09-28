import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios' //dhlu
import App from './App.vue'
import router from './router'

import './assets/main.css'
//https://www.npmjs.com/package/js-cookie
import Cookies from 'js-cookie'
import {tokenUrl} from "./js/common.ts"

axios.defaults.withCredentials = true; //dhlu
//get uuid,token
function GetStoken()
{   
    var lstoken =  localStorage.getItem("stoken") 
    var cstoken = Cookies.get("stoken")

    if( lstoken ){
        if( lstoken != cstoken ) {
            Cookies.set("stoken",lstoken)
            cstoken = lstoken
        }
    }
    if(cstoken && !lstoken){
        localStorage.setItem("stoken",cstoken)
        lstoken = cstoken
    }
    if( !cstoken && !lstoken) return;
    if( cstoken && lstoken) return;
    axios
        // 3.1url地址
        .get(tokenUrl+Math.random())
        // 3.2成功时回调函数
        .then((obj) => {         
         Cookies.set("stoken",obj.data)
         localStorage.setItem("stoken",obj.data)
        })
        //3.3失败时回调函数
        .catch((err) => {
            alert('连接服务器失败，请刷新页面尝试！')            
        });    
}
function isLogin()
{
    var isLogin = Cookies.get('isLogin')
    if(null == isLogin){
        Cookies.set('isLogin',"false",{expires: 7})
    }    
}


isLogin()
GetStoken()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
