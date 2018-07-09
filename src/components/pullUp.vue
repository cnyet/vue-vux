<template>
  <div class="container" ref="wrapper">
    <div class="content">
      <div class="wrap" v-for="(item, index) in list" :key="index">{{item}}</div>
    </div>
    <div class="pullDown-wrap">
      <inline-loading></inline-loading>
    </div>
    <div class="pullUp-wrap">

    </div>
  </div>
</template>

<script>
import { InlineLoading, LoadMore, Scroller } from "vux";

export default {
  data(){
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  components: {
    InlineLoading,
    LoadMore,
    Scroller
  },
  methods: {

  },
  mounted(){

  }
};
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
.container{
  position: relative;
  overflow: hidden;
  background-color: #fff;
  height: 100%;
  .pullDown-wrap{
    height: 30px;
    text-align: center;
    width: 100%;
    position: absolute;
    top: -30px;
    left: 0;
  }
  .content{
    height: 101%;
  }
  .wrap{
    padding: 10px;
    text-align: center;
    color: #666;
    &:nth-child(odd){
      background-color: #eee;
    }
  }

}
</style>
