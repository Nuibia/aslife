<template>
  <div class="carContainer">
    <h2>购物车</h2>
    <ul class="mui-table-view">
      <router-link tag="li" :to="'/home/goodsinfo/'+item.id" class="mui-table-view-cell mui-media" v-for="item in cart" :key="item.id">
        <img class="mui-media-object mui-pull-left" :src="item.img_url" />
        <div class="mui-media-body">
          <p class="goods-info">
            <span class="title">{{item.title}}</span>
            <span class="price">￥{{item.price}}</span>
          </p>
          <p class="goods-control">
            <numberbox :initCount="item.count" :min="1" :max="item.stock" :goodsId="item.id" :isChangeStore="true"></numberbox>
            <span class="remove" @click.stop="remove(item.id)">×</span>
          </p>
        </div>
      </router-link>
      <li class="mui-table-view-cell mui-media total-price">
        总金额：
        <span class="price">￥{{this.$store.getters.getTotalPrice}}</span>
      </li>
    </ul>
    <button type="button" class="mui-btn mui-btn-block mui-btn-danger">结算</button>
  </div>
</template>
<script>
import numberbox from "../subComponents/numberbox.vue";
export default {
  //购物车数据结构
  //[{img_url:xxx,title:xxx,count:xxx,price:xxx}]
  data() {
    return {
      cart: []
    };
  },
  created() {
    this.getcart();
  },
  methods: {
    getcart() {
      // this.cart = this.$store.state.cart;
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },
    remove(goodsId) {
      this.$store.commit("removeGoods", goodsId);
        this.getcart();
    }
  },
  components: {
    numberbox
  }
};
</script>
<style lang="less">
.carContainer {
  h2 {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #444;
    padding: 8px;
    background-color: #fff;
  }
  .mui-table-view {
    margin: 0;
    .mui-table-view-cell {
      //li
      width: 100%;
      .mui-media-object {
        //图片
        max-width: 100px;
        height: 80px;
      }
      .mui-media-body {
        //body
        .goods-info {
          font-size: 16px;
          color: #444;
          line-height: 20px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          .price {
            color: #222;
            font-weight: bold;
          }
        }
        .goods-control {
          display: flex;
          justify-content: space-between;
          .remove {
            font-size: 36px;
            padding: 10px;
          }
        }
      }
    }
    .total-price {
      font-size: 16px;
      color: #333;
      font-weight: bold;
      text-align: center;
      background-color: #fff;
      padding: 10px;
      .price {
        color: #dd524d;
      }
    }
  }
  .mui-btn-danger {
    position: fixed;
    bottom: 40px;
  }
}
</style>