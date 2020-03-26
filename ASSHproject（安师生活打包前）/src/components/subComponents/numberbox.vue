<template>
  <div class="mui-numbox">
    <!-- "-"按钮，点击可减小当前数值 -->
    <button
      class="mui-btn mui-numbox-btn-minus"
      type="button"
      @click.stop="subtract"
      :disabled="subDis"
    >-</button>
    <input class="mui-numbox-input" type="number" :value="currentCount" />
    <!-- "+"按钮，点击可增大当前数值 -->
    <button class="mui-btn mui-numbox-btn-plus" type="button" @click.stop="plus" :disabled="plusDis">+</button>
  </div>
</template>
<script>
export default {
  props: [
    "initCount", //初始值
    "min", //最小值
    "max", //最大值
    "goodsId",//此数字框，对应的商品id
    "isChangeStore",//用来判断是否在修改个数的时候，影响仓储 [true/false]
  ],
  data() {
    return {
      currentCount: 1,
      plusDis: false,
      subDis: true
    };
  },
  created() {
    this.currentCount = this.initCount;
    this.setDisable();
  },
  methods: {
    setDisable() {
      if (this.currentCount >= this.max) {
        this.plusDis = true;//增加方法失效
        this.subDis = false;//减少方法有效
      } else {
        if (this.currentCount <= this.min) {
          this.plusDis = false;//增加方法有效
          this.subDis = true;//减少方法失效
        } else {
          this.plusDis = false;
          this.subDis = false;
        }
      }
    },
    plus() {
      if (this.currentCount < this.max) {
        this.currentCount++;
        //设置两个button的disable
        this.setDisable();
      }
    },
    subtract() {
      if (this.currentCount > this.min) {
        this.currentCount--;
        //设置两个button的disable
        this.setDisable();

      }
    }
  },
  //这里使用onchange来监听数量的变化是不妥的，因为w3c规定的onchange有三个步骤：1.获得焦点 2.数据变化3.失去焦点
  //而这里，input标签压根就没有获取到过焦点。
  //正确做法，是使用watch来监听currentCount
  watch: {
    'currentCount':function (newValue,oldValue) {
      //1.数据放生变化，立即调用父组件传递过来的方法getCount，把currentCount传递给父组件
      this.$emit('getCount',newValue);
      //当数据更新的时候，调用仓储中提供的updateStore方法，更新仓储中的数据
      //以此来更新购物车中的总价格
      //在这里要传递过去一个对象，这个对象形如{id:goodsId,count:xxx}
      if(this.isChangeStore){
        var goodsInfo={id:this.goodsId,count:this.currentCount};
        this.$store.commit('updateStore',goodsInfo);
      }
    }
  }
};
</script>
<style lang="less">
</style>