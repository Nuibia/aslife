//导入vue
import Vue from 'vue'
//导入app.vue
import app from './app.vue'
//导入mui的样式包
import './lib/mui/css/mui.css'

//导入mui的扩展图标的样式文件
import './lib/mui/css/icons-extra.css'

//导入路由vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter);

//导入路由模块route.js
import router from './router.js'

//导入mint-ui
import MintUI from 'mint-ui';
//导入Mint-UI的样式
import 'mint-ui/lib/style.css'
//把MintUI挂载到Vue身上
Vue.use(MintUI);

//导入axios，并挂载到Vue.prototype身上
//axios不支持VUe.use()的语法去挂载
import axios from 'axios'
//配置请求的域名
axios.defaults.baseURL = 'http://www.barteam.cn:8086';
Vue.prototype.$ajax = axios;
//导入moment组件
import  Moment from 'moment'
//格式化日期的过滤器
Vue.filter('dataFormat',function(dateStr,pattern='YYYY-MM-DD HH:MM'){
    return Moment(dateStr).format(pattern);
})

//导入vue-preview插件
import VuePreview from 'vue-preview';
//注册到vue身上
Vue.use(VuePreview);

//导入vuex仓储模块
import store from './store.js';
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})