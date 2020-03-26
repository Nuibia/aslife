<template>
  <div class="appContainer">
    <!-- 这里是handler -->
    <header id="header" class="mui-bar mui-bar-nav">
      <a
        style="color:#eee"
        v-if="showBack"
        @click="goback"
        class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
      ></a>
      <h1 class="mui-title">安师生活-爱安师爱生活</h1>
    </header>
    <!-- 这里是内容区 -->
    <div class="mui-content">
      <!-- 给组件切换添加过渡动画效果 -->
      <transition>
        <keep-alive include="newslist,imagelist">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <!-- 这里是footer -->
    <div class="footer">
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/classes">
          <span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
          <span class="mui-tab-label">分类</span>
        </router-link>
        <router-link class="mui-tab-item" to="/find">
          <span class="mui-icon mui-icon-extra mui-icon-extra-find"></span>
          <span class="mui-tab-label">发现</span>
        </router-link>
        <router-link class="mui-tab-item" to="/cart">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge">{{this.$store.getters.getTotalCount}}</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item" to="/user">
          <span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
          <span class="mui-tab-label">我的</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showBack: false
    };
  },
  methods: {
    goback() {
      //$route是管理路由，和参数
      //$router是管url
      this.$router.go(-1);
    }
  },
  watch: {
    //监听路由，如果是home则不显示回退箭头，否则显示
    "$route.path": function(newValue, oldValue) {
      if (newValue == "/home") {
        this.showBack = false;
      } else {
        this.showBack = true;
      }
    }
  },
  created() {
    if (this.$route.path == "/home") {
      this.showBack = false;
    } else {
      this.showBack = true;
    }
  }
};
</script>
<style lang="less">
.appContainer {
  padding-bottom: 50px;
  overflow-x: hidden;
  .mui-bar-nav {
    background-color: #ce0000;
    .mui-title {
      color: #eee;
      font-size: 20px;
      font-weight: bold;
      font-family: "微软雅黑";
    }
  }
  .footer {
    .mui-bar-tab {
      border-top: 1px solid #ccc;
      overflow: hidden;
      .mui-active {
        color: #ce0000;
      }
    }
  }
}
// 解决组件切换动画效果，组件从左侧离开
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  //以下一行样式，解决进入的组件从下往上跳的问题
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>