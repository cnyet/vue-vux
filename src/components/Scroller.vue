<template>
<div ref="wrapper" class="scroller-container">
  <div class="list-wrapper">
    <slot name="pullDown"
      :pullDownRefresh="pullDownRefresh"
      :beforePullDown="beforePullDown">
      <div class="pullDown-wrapper">
        <div class="pullDown-trigger" v-if="beforePullDown">下拉刷新</div>
        <div class="pullDown-trigger" v-else>
          <load-more v-if="isPullingDown" class="loading" tip="正在加载"></load-more>
          <div v-else>刷新完成</div>
        </div>
      </div>
    </slot>
    <div class="scroll-content" ref="scroll">
      <div class="scroll-wrapper">
        <slot name="content">
          <ul class="list-content" ref="content">
            <li class="list-item" v-for="(item, index) in data" :key="index" @tap="tapItem($event,item)">{{item}}</li>
          </ul>
        </slot>
        <slot name="pullUp"
          :pullUpLoad="pullUpLoad"
          :isPullUpLoad="isPullUpLoad">
          <div class="pullUp-wrapper">
            <div class="pullUp-trigger" v-if="beforePullUp">上拉加载</div>
            <div class="pullUp-trigger" v-else>
              <load-more v-if="isPullUpLoad" class="loading" tip="正在加载"></load-more>
              <div v-else>{{finishLoadMore}}</div>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { LoadMore } from 'vux';
import BScroll from "better-scroll";

export default{
  name: "Scroller",
  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      }
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 1
    },
    probeType: {
      type: Number,
      default: 1
    },
    tap: {
      type: Boolean,
      default: true
    }
  },
  components: {
    LoadMore
  },
  data(){
    return {
      lists: 20,
      scroll: null,
      beforePullDown: true,
      isPullingDown: false,
      beforePullUp: true,
      isPullUpLoad: true,
      pullUpStop: 0,
      pullDownInitTop: 0,
      finishLoadMore: ""
    };
  },
  created(){

  },
  mounted(){
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  watch: {
    data(val) {
      setTimeout(() => {
        this.forceUpdate(true);
      }, 20);
    }
  },
  methods: {
    initScroll(){
      this.$refs.content.style.minHeight = `${this.$refs.scroll.clientHeight+1}px`;
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: this.probeType,
        startY: this.startY,
        scrollbar: this.scrollbar,
        tap: true,
        pullDownRefresh: {
          threshold: 80,
          stop: 50
        },
        pullUpLoad: {
          threshold: 80
        },
      });
      this.initPullDownRefresh();
      this.initPullUpLoad();
    },
    initPullDownRefresh(){
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false;
        this.isPullingDown = true;
        setTimeout(() => {
          this.$emit('pullingDown');
        }, 1000);
      });
    },
    reboundPullDown() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.scroll.finishPullDown();
          resolve();
        }, 500);
      });
    },
    afterPullDown() {
      setTimeout(() => {
        this.beforePullDown = true;
        this.refresh();
      }, this.scroll.options.bounceTime);
    },
    forceUpdate(val) {
      if (this.isPullingDown){
        this.isPullingDown = false;
        this.reboundPullDown().then(() => {
          this.afterPullDown();
        });
      } else if (this.isPullUpLoad){
        this.isPullUpLoad = false;
        if(val){
          this.finishLoadMore = "加载完成";
        }else{
          this.finishLoadMore = "没有更多数据了";
        }
        setTimeout(() => {
          this.scroll.finishPullUp();
        }, this.scroll.options.bounceTime);
      } else {
        this.refresh();
      }
    },
    initPullUpLoad(){
      this.scroll.on('pullingUp', () => {
        setTimeout(() => {
          this.$emit('pullingUp');
        }, 1000);
      });
      this.scroll.on("scrollStart", ()=>{
        this.beforePullUp = true;
        this.isPullUpLoad = true;
      });
      this.scroll.on('touchEnd', (pos) => {
        this.beforePullUp = false;
        this.isPullingUp = true;
      });
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    tapItem(e, item) {
      console.log(e);
      this.$emit('tap', item);
    },
  }
};
</script>

<style lang="scss">
.scroller-container{
  .list-wrapper{
    position: relative;
    height: 614px;
    font-size: 14px;
    .loading{
      height: 24px;
      margin: 13px auto;
    }
    .pullDown-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .pullDown-trigger{
        color: #999;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
    }
    .pullUp-wrapper{
      .pullUp-trigger{
        color: #999;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
    }
  }
}
.scroll-content{
  background-color: #f0f0f0;
  height: 100%;
  overflow: hidden;
  .list-content{
    background-color: #fff;
    .list-item{
      padding: 10px;
      text-align: center;
      color: #666;
      &:nth-child(odd){
        background-color: #ddd;
      }
    }
  }
}
</style>
