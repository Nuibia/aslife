//使用vuex的步骤：
//1.安装 npm i vuex -S
//2.导入 import vuex from 'vuex'
//3.注册到Vue身上 Vue.use(vuex)
//4.创建仓储对象 const store = new Vuex.Store({})
//5.把仓储对象挂载到vm对象身上
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var lsCart=JSON.parse(localStorage.getItem('cart')||'[]');

const store=new Vuex.Store({
    state: {//访问方式：this.$store.state.xxx
        //data
        cart:lsCart,
    },
    mutations: {
        //methods
        //mutations里定义的方法，至少有1个参数叫做state，它就是store中的state成员，而且这个参数必须放在参数列表的第一位
        //如果该方法需要有自己的参数，那么这个参数只能放在第二位
        //mutation、里定义的方法，最多只能有两个参数
        addToCart(state,goods){
            //this.$store.commit('方法名');
            //点击添加购物车的代码逻辑
            //1.如果购物车没有该商品，就直接push进去
            //2.如果购物车已经有了该商品，那么只需修改这个商品的数量就可以了
            var flag=false;
            state.cart.some(item=>{
                if(goods.id==item.id){
                    item.count+=parseInt(goods.count);
                    flag=true;//表示找到相同项了
                    return true;
                }
            })
            if(!flag){
                state.cart.push(goods);
            }
            //每次仓储放生改变，都要把数据持久化到localStorage中
            //localStorage是以key:value对的形式来存储数据的
            //而且value必须是string
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        removeGoods(state,goodsId){
            //1.遍历state.cart数组，如果有id==goodsId的对象，就把这个对象删除了
            state.cart=state.cart.filter(item=>{
                return item.id!=goodsId;
            })
            //2.把state.cart中的数据，持久化到localstorage中
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        //实现在购物车中，修改购买商品的个数，要把总金额同步变化
        //1.在store.js中，提供一个修改仓储数据的方法
        //2.让numberbox点击修改购买个数的时候，调用此方法
        updateStore(state,goodsInfo){
            state.cart.some(item=>{
                if(item.id==goodsInfo.id){
                    item.count=goodsInfo.count
                }
            })
            //修改完后，要更新到本地存储
            if(state.cart.length>0){
                localStorage.setItem('cart',JSON.stringify(state.cart));
            }
        }
        
    },
    getters: {//访问方式 this.$store.getters.getTotalcount
        //计算属性
        //获取仓储中cart里所有商品数量的总和
        getTotalCount(state){
            var total=0;
            state.cart.forEach(item=>{
                total+=item.count;
            })
            return total;
        },
        getTotalPrice(state){
            var  total=0;
            state.cart.forEach(item=>{
                total+=item.price*item.count;
            })
            return total;
        }
    }
})
export default store;