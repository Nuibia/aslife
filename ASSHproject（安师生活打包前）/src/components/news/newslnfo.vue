<template>
  <div class="newsinfoContainer">
    <!-- 这是标题部分 -->
    <section class="title">
      <h2>{{this.news.title}}</h2>
    </section>
    <!-- 编辑 日期 点击量 部分 -->
    <section class="des">
      <p>
        <span class="author">编辑：{{this.news.author}}</span>
        <span class="add_time">日期：{{this.news.add_time|dataFormat}}</span>
        <span class="click_count">阅读：{{this.news.click_count}}</span>
      </p>
    </section>
    <!-- 图片 部分 -->
    <section class="img">
      <img :src="this.news.img_url" alt />
    </section>
    <!-- 新闻 正文部分 -->
    <section class="content">
      <div v-html="this.news.content"></div>
    </section>
    <!-- 评论 部分 -->
    <section class="comment">
      <!-- 封装一个评论的组件 -->
      <comment :id="this.newsid"></comment>
    </section>
  </div>
</template>
<script>

//导入评论组件
import comment from '../subComponents/comment.vue';
//把comment挂载到newsinfo身上
//通过标签的形式，插入到newsinfo的template中

export default {
  data() {
    return {
      newsid: this.$route.params.id, //第一步，获取路由传递过来参数
      news: {} //保存通过ajax请求获取到的新闻数据，以此来做数据绑定
    };
  },
  created() {
    this.loadNewsInfo();
  },
  methods: {
    //第二步，通过ajax请求，获取新闻数据
    loadNewsInfo() {
      this.$ajax({
        method: "get",
        url: "/news/newsinfo",
        params: {
          newsid: this.newsid
        }
      }).then(response => {
        var data = response.data;
        if (data.Status == 0) {
          this.news = data.Data[0];
        }
      });
    }
  },
  components: {
    comment
  }
};
</script>
<style lang="less">
.newsinfoContainer {
  padding: 15px;
  .title {
    padding: 5px 0;
    font-size: 24px;
    color: #333;
  }
  .des {
    padding-bottom: 20px;
    p {
      font-size: 12px;
      color: #aaa;
      display: flex;
      justify-content: space-between;
    }
  }
  .img {
    img {
      width: 100%;
    }
  }
  .content {
    p {
      font-size: 14px;
      color: #444;
    }
    img {
      width: 100%;
    }
  }
}
</style>