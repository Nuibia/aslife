<template>
  <div class="goodlistContainer">
    <ul
      class="mui-table-view"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="10"
      style="max-height:100vh overflow-y:auto;"
    >
      <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id" @click="goToGoodsinfo(item.id)">
        <!-- <router-link :to="'/home/goodsinfo/'+item.id"> -->
        <img class="mui-media-object mui-pull-left" :src="item.img_url" />
        <div class="mui-media-body">
          <h3 class="title">{{item.title}}</h3>
          <p class="price">
            <span class="salePrice">￥{{item.sell_price}}</span>
            <span class="markerPrice">原价:￥{{item.market_price}}</span>
          </p>
          <p class="stock">库存：{{item.stock}}</p>
          <button type="button" class="mui-btn mui-btn-danger">立即抢购</button>
        </div>
        <!-- </router-link> -->
      </li>
      <!-- 加载动画部分 -->
      <li class="more_loading">
        <mt-spinner type="fading-circle" v-show="is_loading_more"></mt-spinner>
        <span v-show="finished">已经加载全部信息</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "goodslist",
  data() {
    return {
      list: [], //新闻列表
      isLoading: false, //默认是要响应上滑动作的
      pageindex: 1,
      pagesize: 10,
      is_loading_more: false, //控制是否显示加载动画图标
      finished: false //控制是否显示，已经加载所有数据
    };
  },
  methods: {
    loadMore() {
      this.isLoading = true;
      this.is_loading_more = true;
      this.finished = false;
      this.$ajax({
        method: "get",
        url: "/goods/goodslist",
        params: {
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
      }).then(response => {
        var data = response.data;
        if (data.Status == 0) {
          if (data.Data.length > 0) {
            this.list = this.list.concat(data.Data); //拼接两个数组，不能直接赋值
            this.pageindex++;
            this.isLoading = false; //允许在响应上滑动作
          } else {
            this.is_loading_more = false;
            this.isLoading = true;
            this.finished = true;
          }
        } else {
          Toast("服务器请求数据失败");
        }
      });
    },
    goToGoodsinfo(goodsId){
      //编程式导航
      //1.给li标签添加@click事件
      //2.在路由模块router.js中，给路由匹配规则添加name属性
      //3.在click事件中，使用this.$router.push(name:xxx,paramx:{})
      this.$router.push({name:'goodsinfo',params:{id:goodsId}})
    }
  }
};
</script>
<style lang="less">
.goodlistContainer {
  .mui-table-view-cell {
    .mui-media-object {
      max-width: 120px;
      height: 100px;
    }
    .mui-media-body {
      .title {
        font-size: 16px;
        font-weight: bold;
        font-family: "微软雅黑";
        color: #333;
        padding-bottom: 18px;
      }
      .price {
        font-size: 12px;
        color: #888;
        margin: 0;
        .salePrice {
          font-size: 18px;
          color: #ce0000;
          font-family: "微软雅黑";
          font-weight: bold;
          margin-right: 10px;
        }
        .markerPrice {
          text-decoration: line-through;
        }
      }
      .mui-btn-danger {
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    }
  }
  .more_loading {
    font-size: 12px;
    color: #aaa;
    text-align: center;
    border: none;
    .mint-spinner-fading-circle {
      position: relative;
      left: 45%;
    }
  }
}
</style>