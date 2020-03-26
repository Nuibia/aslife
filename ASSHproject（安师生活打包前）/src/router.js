import VueRouter from 'vue-router'

//导入tab栏的子组件
import home from './components/tab/home.vue'
import classes from './components/tab/classes.vue'
import cart from './components/tab/cart.vue'
import user from './components/tab/user.vue'
import find from './components/tab/find.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newslnfo.vue'
import imagelist from './components/photo/imagelist.vue'
import imageinfo from './components/photo/imageinfo.vue'
import goodslist from './components/shop/goodslist.vue'
import goodsinfo from './components/shop/goodinfo.vue'
var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home },
        { path: '/classes', component: classes },
        { path: '/cart', component: cart },
        { path: '/user', component: user },
        { path: '/find', component: find },
        { path: '/home/newslist', component: newslist },
        { path: '/home/newsinfo/:id', component: newsinfo },
        { path: '/home/imagelist', component: imagelist },
        { path: '/home/imageinfo/:id', component: imageinfo },
        { path: '/home/goodslist', component: goodslist },
        { path: '/home/goodsinfo/:id', component: goodsinfo, name: 'goodsinfo' },
    ],
    linkActiveClass: 'mui-active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }

})
export default router;//重点：当分离出来router.js模块后，一定要把router路由规则对象暴露出去
//页面跳转显示在顶部
