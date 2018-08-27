<template>
<div ref="wrapper" class="scroller-container">
  <div class="list-wrapper">
    <slot name="pullDown"
      :pullDownRefresh="pullDownRefresh"
      :beforePullDown="beforePullDown">
      <div class="pullDown-wrapper">
        <div class="pullDown-trigger" v-if="beforePullDown">
          <span>下拉刷新</span>
        </div>
        <div class="pullDown-trigger" v-else>
          <div v-if="isPullingDown">
            <load-more class="loading" tip="正在刷新"></load-more>
          </div>
          <div v-else>刷新完成</div>
        </div>
      </div>
    </slot>
    <div class="scroll-content" ref="scroll">
      <div class="scroll-wrapper">
        <slot name="content">
          <ul class="list-content" :style="contentStyle">
            <li class="list-item" v-for="(item, index) in lists" :key="index">{{item}}</li>
          </ul>
        </slot>
        <slot name="pullUp"
          :pullUpLoad="pullUpLoad"
          :isPullUpLoad="isPullUpLoad">
          <div class="pullUp-wrapper">
            <div class="pullUp-trigger" v-if="beforePullUp">
              <span>上拉加载</span>
            </div>
            <div class="pullUp-trigger" v-else>
              <div v-if="isPullUpLoad">
                <load-more class="loading" tip="正在加载"></load-more>
              </div>
              <div v-else>加载完成</div>
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
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    listenScrollEnd: {
      type: Boolean,
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
    mouseWheel: {
      type: Boolean,
      default: false
    },
    click: {
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
      pullDownStyle: '',
      contentStyle: "",
      pullUpStop: 0,
      bubbleY: 0,
      pullDownInitTop: 0,
      isRebounding: false,
    };
  },
  created(){

  },
  mounted(){
    this.$nextTick(() => {
      this.initScroll();
      this.contentStyle = `min-height: ${this.$refs.scroll.clientHeight}px`;
    });
  },
  methods: {
    initScroll(){
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: 1,
        pullDownRefresh: {
          threshold: 30,
          stop: 50
        },
        pullUpLoad: {
          threshold: 30
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
          console.log("start");
          this.forceUpdate(true);
        }, 2000);
      });
      this.scroll.on('scroll', (pos) => {
        if (!this.pullDownRefresh) {
          return;
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
        } else {
          this.bubbleY = 0;
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`;
        }
      });
    },
    reboundPullDown() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true;
          this.scroll.finishPullDown();
          resolve();
        }, 1000);
      });
    },
    afterPullDown() {
      console.log("finish");
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`;
        this.beforePullDown = true;
        this.isRebounding = false;
        this.refresh();
      }, this.scroll.options.bounceTime);
    },
    forceUpdate(dirty) {
      console.log(this.isPullUpLoad);
      if (this.isPullingDown) {
        this.isPullingDown = false;
        console.log("update");
        this.reboundPullDown().then(() => {
          this.afterPullDown();
        });
      } else if (this.isPullUpLoad) {
        console.log("loading", this.pullUpStop);
        this.reboundPullUp().then(() => {
          this.afterPullUp();
        });
      } else {
        this.refresh();
      }
    },
    initPullUpLoad(){
      this.scroll.on('pullingUp', () => {
        setTimeout(() => {
          console.log("start");
          this.forceUpdate(true);
        }, 2000);
      });
      this.scroll.on('touchEnd', (pos) => {
        this.beforePullUp = false;
        this.isPullingUp = true;
        console.log("滑动结束"+pos.y);
      });
    },
    afterPullUp(){
      this.isPullUpLoad = false;
      console.log("finish");
      setTimeout(() => {
        this.isPullUpLoad = true;
        this.isRebounding = true;
        this.beforePullUp = true;
        this.refresh();
      }, this.scroll.options.bounceTime);
    },
    reboundPullUp() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true;
          this.scroll.finishPullUp();
          resolve();
        }, 1000);
      });
    },
    refresh() {
      this.scroll && this.scroll.refresh();
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
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
    }
    .pullUp-wrapper{
      .pullUp-trigger{
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
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
