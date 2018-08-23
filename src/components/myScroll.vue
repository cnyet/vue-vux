<template>
  <div class="container">
    <div class="refresh" slot="refresh" :class="isRefresh ? 'active':''" :style="{height: offsetTop+'px'}">
      <load-more v-if="isLoading" tip="正在加载"></load-more>
      <p v-else class="scroller-text">{{refreshMsg}}</p>
    </div>
    <div class="wrapper"
      slot="content"
      ref="scroll"
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd($event)">
      <div class="scroller" ref="group">
        <ul>
          <li class="wrap" v-for="(item, index) in list" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="loadmore" slot="loadmore" :class="isLoadmore ? 'active':''" :style="{height: offsetBottom+'px'}">
      <load-more v-if="isLoading" tip="正在加载"></load-more>
      <p v-else class="scroller-text">{{loadmoreMsg}}</p>
    </div>
  </div>
</template>

<script>
import IScroll from "iscroll";
import IScrollProbe from 'iscroll/build/iscroll-probe';
import { LoadMore } from 'vux';

export default{
  name: "scroller",
  data(){
    return {
      iscroll: null,
      refScroll: null,
      isRefresh: false,
      isLoadmore: false,
      list: 20,
      offsetTop: 0,
      offsetBottom: 0,
      scrollTop: 0,
      refreshMsg: "下拉刷新",
      loadmoreMsg: "上拉加载",
      isLoading: false
    };
  },
  components: {
    LoadMore
  },
  mounted(){
    let self = this;
    this.refScroll = this.$refs.scroll;
    this.iscroll = new IScrollProbe(this.refScroll, {
      mouseWheel: true,   //监听鼠标滚轮事件
      probeType: 2,
    });
    this.iscroll.on("beforeScrollStart", function(){
      // console.log("滚动之前");
    });
    this.iscroll.on("scrollStart", function(){
      if(this.directionY == -1){
        console.log("向下");
      }else if(this.directionY == 1){
        self.isLoadmore = true;
        console.log("向上");
      }else{
        console.log("不变");
      }
    });
    this.iscroll.on("scroll", function(){
      self.scrollTop = this.y;

      if(this.y > 10){
        self.isRefresh = true;
        self.offsetTop = this.y;
        if(this.y >= 42){
          self.refreshMsg = "松开加载";
        }
      }
      if(this.y <= this.maxScrollY){
        self.offsetBottom = Math.abs(this.y)-Math.abs(this.maxScrollY);
        if(self.offsetBottom > 10){
          self.isLoadmore = true;
          if(self.offsetBottom >= 42){
            self.loadmoreMsg = "松开加载";
          }
        }
      }
    });
    this.iscroll.on("scrollEnd", function(){
      console.log("滚动"+this.y);
      if(self.scrollTop >= 42){
        self.isLoading = true;
        setTimeout(()=>{
          self.isRefresh = false;
          self.refreshMsg = "下拉刷新";
          self.offsetTop = this.y;
          self.isLoading = false;
        }, 1000);
      }else{
        self.isRefresh = false;
      }
      if(self.offsetBottom >= 42){
        self.isLoading = true;
        setTimeout(()=>{
          self.isLoadmore = false;
          self.loadmoreMsg = "上拉加载";
          self.offsetBottom = 0;
          self.isLoading = false;
        }, 1000);
      }else{
        self.isLoadmore = false;
      }
      // console.log("结束");
    });
  },
  methods: {
    touchStart(e){
      // this.pageX = e.targetTouches[0].pageX;
      // this.pageY = e.targetTouches[0].pageY;
      // console.log("start");
    },
    touchMove(e){
      // console.log(this.refScroll.scrollTop);
      // if(e.targetTouches[0].pageY > this.pageY){
      //   if(this.refScroll.scrollTop == 0){
      //     let offsetY = e.targetTouches[0].pageY - this.pageY;
      //   }
      // }


      e.preventDefault();
      // console.log("move");
    },
    touchEnd(e){
      // console.log("end");
    }
  }
};

</script>

<style lang="scss" scoped>
.container{
  position: relative;
  overflow: hidden;
  height: 100%;
}
.refresh,
.loadmore{
  position: relative;
  left: 0;
  height: 0;
  display: none;
  &.active{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
.refresh{
  top: 0;
}
.loadmore{
  bottom: 0;
  height: 42px;
}
.scroller-text{
  font-size: 14px;
  color: #666;
  text-align: center;
  padding: 10px 15px;
}
.wrapper {
  position: relative;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
}
.scroller {
  position: absolute;
  z-index: 1;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  width: 100%;
  background-color: #fff;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: none;
  -o-text-size-adjust: none;
  text-size-adjust: none;
}
.wrap{
  padding: 10px;
  text-align: center;
  color: #666;
  &:nth-child(odd){
    background-color: #eee;
  }
}

</style>
