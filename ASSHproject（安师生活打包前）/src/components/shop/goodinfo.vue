<template>
  <div class="goodsinfoContainer">
    <!-- 轮播图区域 -->
    <!-- 1.导入轮播图组件  import-->
    <!-- 2.父组件身上挂载 -->
    <!-- 3.以标签的形式，插入到模板结构内 -->
    <swipte :speed="3000" :swipeList="swipeList"></swipte>
    <!-- 商品信息区域 -->
    <div class="goodsInfo">
      <p class="price">
        <span class="saleprice">
          <span>￥</span>
          {{this.goodsInfo.sell_price}}
        </span>
        <span class="marketprice">
          <label class="lb">商场价:</label>
          {{this.goodsInfo.market_price}}
        </span>
      </p>
      <p class="title">{{this.goodsInfo.title}}</p>
      <p class="abstract">{{this.goodsInfo.abstract}}</p>
      <p class="add_time">
        <label class="lb">发布时间</label>
        {{this.goodsInfo.add_time| dataFormat}}
      </p>
      <p class="stock">
        <span>
          <label class="lb">库存</label>
          {{this.goodsInfo.stock}}
        </span>
        <span>
          <label class="lb">关注度：</label>
          {{this.goodsInfo.click_count}}
        </span>
      </p>
      <p class="count">
        <label class="lb">购买数量:</label>
        <!-- 1.导入numberbox组件 -->
        <!-- 2.挂载到父组件身上 -->
        <!-- 3.以标签的形式，插入到合适的位置 -->
        <numberbox :min="1" :max="this.goodsInfo.stock" :initCount="1" :goodsId="this.goodsId" :isChangeStore="false" @getCount="getGoodsCount"></numberbox>
      </p>
      <p>
        <button type="button" class="mui-btn mui-btn-warning" @click="addTocart">加入购物车</button>
        <button type="button" class="mui-btn mui-btn-danger">立即购买</button>
      </p>
    </div>
    <!-- 卖家信息区域 -->
    <div class="sellerInfo">
      <h3>卖家信息</h3>
      <p class="seller">
        <label class="lb">卖家:</label>
        {{this.goodsInfo.seller}}
      </p>
      <p class="sellerphone">
        <label class="lb">电话:</label>
        {{this.goodsInfo.seller_phone}}
      </p>
    </div>
    <!-- 商品详情信息区域 -->
    <div class="imgInfo">
      <ul>
        <li v-for="item in swipeList" :key="item.id"><img :src="item.img_url" alt=""></li>
      </ul>
    </div>
    <!-- 评论区域 -->
    <comment :id="goodsId"></comment>
  </div>
</template>
<script>
import swipte from "../subComponents/swipe.vue";
import { Toast } from "mint-ui";
import numberbox from "../subComponents/numberbox.vue";
import comment from "../subComponents/comment.vue"
export default {
  data() {
    return {
      swipeList: [], //商品轮播图数据
      goodsId: this.$route.params.id, //获取到商品主键的id
      goodsInfo: {},
      goodsCount:1,
    };
  },
  created() {
    this.getSwipeData();
    this.getGoodsInfo();
  },
  methods: {
    getGoodsInfo() {
      this.$ajax({
        method: "get",
        url: "/goods/goodsinfo",
        params: {
          goodsid: this.goodsId
        }
      }).then(response => {
        var data = response.data;
        if (data.Status == 0) {
          this.goodsInfo = data.Data[0];
        } else {
          Toast("服务端获取数据失败");
        }
      });
    },

    getSwipeData() {
      this.$ajax({
        method: "get",
        url: "/thumbs/" + this.goodsId
      }).then(response => {
        var data = response.data;
        if (data.Status == 0) {
          this.swipeList = data.Data;
        } else {
          Toast("服务器获取图片失败");
        }
      });
    },
    addTocart(){
      //子组件向父组件传值
      //1.父组件通过事件机制给子组件传递一个带参数的方法
      //2.在子组件内部，找合适的时机，调用该方法，通过参数传递，把想给父组件的数据传递过来
      var goods={
        id:this.goodsId,
        img_url:this.goodsInfo.img_url,
        title:this.goodsInfo.title,
        price:this.goodsInfo.sell_price,
        count:this.goodsCount,
        stock:this.goodsInfo.stock,
      }
      // this.$store.state.cart.push(goods);
      //应该调用仓储对象mutations里提供的方法，来间接处理state中的数据成员
            this.$store.commit('addToCart',goods);
            // console.log(this.$store.state.cart);
    },
    //要传递给子组件的方法用来让子组件向父组件传值
    getGoodsCount(count){
      this.goodsCount=count;
    }
  },
  components: {
    swipte,
    numberbox,
    comment
  }
};
</script>
<style lang="less">
.goodsinfoContainer {
  padding: 8px;
  .goodsInfo {
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    p {
      font-size: 14px;
      line-height: 16px;
      color: #333;
      margin: 20px;
      label.lb {
        color: #999;
        margin-right: 20px;
      }
    }
    .price {
      .saleprice {
        color: #ce0000;
        font-size: 28px;
        font-weight: bold;
        font-family: "微软雅黑";
        margin-right: 20px;
        span {
          font-size: 12px;
        }
      }
      .marketprice {
        text-decoration: line-through;
        .lb {
          margin: 0px;
        }
      }
    }
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .abstract {
      font-size: 15px;
      line-height: 20px;
    }
    .stock {
      span {
        margin-right: 20px;
      }
    }
  }
  .sellerInfo{
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    h3{
      font-size: 14px;
      color: #999;
      margin-bottom: 20px;
    }
    p{
      color: #333;
      label.lb{
        color: #999;
        margin-right: 20px;
      }
    }
  }
  .imgInfo{
    background-color: #fff;
    border-radius: 5px;
    ul{
      list-style: none;
      padding: 0;
      margin: 0;
      li{
        width: 100%;
        img{
          width: 100%;
        }
      }
    }
  }
}
</style>