<template>
  <div class="container">
    <div class="pullDown-wrapper">
      下拉刷新
    </div>
    <div class="list-wrapper">
      <div class="scroll-content" ref="scroll">
        <ul class="list-content">
          <li class="list-item" v-for="(item, index) in lists" :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="pullUp-wrapper">
        上拉加载
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, Actionsheet, Group, Cell } from "vux";
import BScroll from "better-scroll";

export default {
  data(){
    return {
      lists: 20,
      scroll: null
    };
  },
  components: {
    Group,
    Cell,
  },
  created(){

  },
  mounted(){
    this.$nextTick(()=>{
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: 1,
        pullDownRefresh: {
          threshold: 30,
          stop: 20
        },
        pullUpLoad: {
          threshold: 30
        },
      });
    });
  },
  computed: {

  },
  methods: {

  }
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.container{
  position: relative;
  .pullDown-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    text-align: center;
  }
  .list-wrapper{
    position: relative;
    height: 614px;
    .pullUp-wrapper{
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      text-align: center;
    }
  }
}
.scroll-content{
  background-color: #ccc;
  height: 100%;
  overflow: hidden;
  .list-content{
    background-color: #fff;
    .list-item{
      padding: 10px;
      text-align: center;
      color: #666;
      &:nth-child(odd){
        background-color: #f0f0f0;
      }
    }
  }
}
</style>
