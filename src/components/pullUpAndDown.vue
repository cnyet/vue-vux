<template>
  <div class="my-scroll"
    ref="myScroll"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @scroll="scroller($event)">
    <div class="scroll-top" :style="{height: top+'px'}">
      <div v-if="aspect==2">
        <p v-if="state==6">下拉刷新</p>
        <p v-if="state==1">刷新中...</p>
        <p v-if="state==2">松开刷新</p>
        <p v-if="state==3">刷新完成</p>
      </div>
    </div>
    <div class="scroll-list" ref="list" :style="{transform: 'translate3d(0, '+top+'px, 0)'}">
      <slot name="scrollList"></slot>
    </div>
    <div class="scroll-bottom" :style="{height: bottom+'px'}">
      <div v-if="aspect==1">
        <div v-if="state==7">上拉加载</div>
        <div v-if="state==4">加载中...</div>
        <div v-if="state==5">加载完成</div>
        <div v-if="state==8">松开加载</div>
        <div v-if="state==9">没有更多</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myScroll",
  props: {
    "page": {
      type: Object,
      require: true
    },
    'getScrollTop': {
      type: Function
    },
    "setScrollPage": {
      type: Function
    }
  },
  data(){
    return {
      pageX: 0,
      pageY: 0,
      state: 0,
      scrollPosition: 0,
      myScroll: null,
      myScrollList: null,
      top: 0,
      bottom: 0,
      aspect: 0,
      distance: 0,
      listHeight: 0
    };
  },
  components: {

  },
  methods: {
    touchStart(e){
      this.pageX = e.targetTouches[0].pageX;
      this.pageY = e.targetTouches[0].pageY;
    },
    touchMove(e){
      this.distance = this.myScroll.scrollHeight - this.myScroll.offsetHeight;
      console.log(this.myScroll.scrollHeight, this.myScroll.offsetHeight, this.myScroll.scrollTop);
      this.scrollPosition = this.myScroll.scrollTop;
      if(e.targetTouches[0].pageY > this.pageY){
        this.aspect = 2;
        if(this.myScroll.scrollTop == 0){
          let diff = e.targetTouches[0].pageY - this.pageY - this.scrollPosition;
          this.top = Math.pow(diff, 0.9);
          let ranget = diff/document.body.clientHeight * 100;
          if(ranget > 20){
            this.state = 2;
          }else if(ranget < 15){
            this.state = 6;
          }
        }
      }else{
        this.aspect = 1;
        let diff = this.pageY - e.targetTouches[0].pageY;
        this.bottom = Math.pow(diff, 0.9);
        this.top = -Math.pow(diff, 0.9);
        let ranget = diff/document.body.clientHeight * 100;
        if(ranget > 20){
          this.state = 8;
        }else if(ranget < 15){
          this.state = 7;
        }
      }
      e.preventDefault();
      console.log("move");
    },
    touchEnd(e){
      if(this.aspect == 2 && this.state == 2 || this.state == 1){
        this.state = 1;
        setTimeout(()=>{
          this.state = 3;
          this.callback(this.state);
        }, 500);
      }else if(this.aspect == 1){
        this.state = 4;
        this.bottom = 100;
        setTimeout(()=>{
          this.state = 5;
          // this.$emit("on-pull");
          this.callback(this.state);
        }, 500);
      }
      console.log("end");
    },
    callback(index){
      if(index == 5 || index == 3){
        setTimeout(()=>{
          this.state = 0;
          this.top = 0;
          this.bottom = 0;
        }, 300);
      }
    },
    scroller(e){
      console.log("scroll");
    }
  },
  mounted(){
    this.myScroll = this.$refs.myScroll;
    this.myScrollList = this.myScroll.children[1];
  },
  created(){

  }
};
</script>

<style lang="less" scoped>
.my-scroll{
  color: #666;
  height: 100%;
  overflow:hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  will-change: transform;
  transition: all 450ms;
  backface-visibility: hidden;
  perspective: 1000;
  position: relative;
  .scroll-top{
      text-align: center;
      display:flex;
      position:absolute;
      top:0;
      left:0;
      width:100%;
      div{
          display:flex;
          height:auto;
          width:100%;
          justify-content: center;
          align-items:center;
          flex-wrap: wrap;
          i{
              flex:1 0 100%;
              display:block;
              height: 0.4rem;
          }
          img{
              width:0.8rem;
          }
          p{
              flex:1 0 100%;
          }
      }
  }
  .scroll-list{
    background-color: #fff;
    overflow:hidden;
  }
  .scroll-bottom{
    text-align: center;
      display:flex;
      position:absolute;
      bottom: -10px;
      left:0;
      width:100%;
      div{
          display:flex;
          height:auto;
          width:100%;
          justify-content: center;
          align-items:center;
          flex-wrap: wrap;
          i{
              flex:1 0 100%;
              display:block;
              height: 0.4rem;
          }
          img{
              width:0.8rem;
          }
          p{
              flex:1 0 100%;
          }
      }
  }
}
</style>
