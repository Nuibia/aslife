<template>
  <div class="imageinfoContainer">
    <!-- 顶部 基础信息 -->
    <section class="top">
      <h3 class="title">{{this.imageinfo.title}}</h3>
      <p class="subinfo">
        <span class="author">发布者：{{this.imageinfo.author}}</span>
        <span class="add_time">{{this.imageinfo.add_time|dataFormat}}</span>
        <span class="click_count">阅读量：{{this.imageinfo.click_count}}</span>
      </p>
    </section>
    <!-- 简介 -->
    <section class="abstract">
      <p v-html="this.imageinfo.abstract"></p>
    </section>
    <!-- 缩略图 -->
    <section class="thumbs">
      <!-- vur-preview使用步骤： -->
      <!-- 1.安装npm i vue-preview -S
2.在main.js中导入import VuePreview from 'vue-preview';
3.挂载到Vue身上，Vue.use(VuePreview);
4.在组件的template模板上，使用它，标签名是vue-preview，其中，：slides属性，是用于绑定具体的预览图片的数据，这个属性必须有
      5.在业务逻辑中，通过ajax请求，获取：slides需要的数据-->
      <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
    </section>
    <!-- 评论 -->
    <section class="cmt">
      <comment :id="this.imgId"></comment>
    </section>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from '../subComponents/comment.vue'
export default {
  data() {
    return {
      imgId: this.$route.params.id,
      imageinfo: {},
      thumbsList: []
    };
  },
  created() {
    this.getImageInfo();
    this.getThumbsList();
  },
  methods: {
    //获取图片的基础信息
    getImageInfo() {
      this.$ajax({
        method: "get",
        url: "/images/imagesinfo",
        params: {
          imgid: this.imgId
        }
      }).then(response => {
        var data = response.data;
        if (data.Status == 0) {
          this.imageinfo = data.Data[0];
        } else {
          Toast("服务端抽风：获取图片信心失败");
        }
      });
    },
    //获取该组图片的缩略图
    getThumbsList() {
      this.$ajax({
        method: "get",
        url: "/thumbs/" + this.imgId
      }).then(response => {
        var data = response.data;
        if (data.Status == 0) {
          data.Data.forEach(item => {
            (item.w = 600),
              (item.h = 400),
              (item.src = item.img_url),
              (item.msrc = item.img_url);
          });
          this.thumbsList = data.Data;
        } else {
          Toast("服务器获取缩略图数据失败");
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
.imageinfoContainer {
  padding: 10px;
  .top {
    border-bottom: 1px solid #bbb;
    .title {
      font-size: 20px;
      color: #333;
      font-family: "微软雅黑";
      text-align: center;
    }
    .subinfo {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin: 0;
    }
  }
  .abstract {
    font-size: 14px;
    padding: 10px;
    color: #444;
    text-indent: 2em;
    line-height: 22px;
  }
  .thumbs {
    .imgPrev {
      .my-gallery {
        figure {
          display: inline-block;
          margin: 9px;
          img {
            width: 80px;
            height: 60px;
          }
        }
      }
    }
  }
}
</style>