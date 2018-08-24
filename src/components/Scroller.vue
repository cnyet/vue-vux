<template>
  <div ref="wrapper" class="scroller-container">
    <div class="scroll-content">
      <div class="list-wrapper" ref="listWrapper">
        <slot name="pullDown"
          :pullDownRefresh="pullDownRefresh"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown">
          <div ref="pulldown" class="pulldown-wrapper" v-if="pullDownRefresh">
            <div class="before-trigger" v-if="beforePullDown">
              <span>松开加载</span>
            </div>
            <div class="after-trigger" v-else>
              <div v-if="isPullingDown" class="loading">
                <load-more tip="正在加载"></load-more>
              </div>
              <div v-else><span>加载完成</span></div>
            </div>
          </div>
        </slot>
        <slot>
          <ul class="list-content">
            <li class="list-item" v-for="(item, index) in lists" :key="index">{{item}}</li>
          </ul>
        </slot>
        <slot name="pullUp"
          :pullUpLoad="pullUpLoad"
          :isPullUpLoad="isPullUpLoad">
          <div class="pullup-wrapper" v-if="pullUpLoad">
            <div class="before-trigger" v-if="!isPullUpLoad">
              <span>松开加载</span>
            </div>
            <div class="after-trigger" v-else>
              <span>加载完成</span>
            </div>
          </div>
        </slot>
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
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: false
    };
  },
  created(){

  },
  mounted(){
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `660px`;
      }

      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY
      };

      this.scroll = new BScroll(this.$refs.wrapper, options);

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos);
        });
      }

      if (this.listenScrollEnd) {
        this.scroll.on('scrollEnd', (pos) => {
          this.$emit('scroll-end', pos);
        });
      }

      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart');
        });

        this.scroll.on('scrollStart', () => {
          this.$emit('scroll-start');
        });
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh();
      }

      if (this.pullUpLoad) {
        this._initPullUpLoad();
      }
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false;
        this.isPullingDown = true;
        this.$emit('pullingDown');
      });

      this.scroll.on('scroll', (pos) => {
        if (!this.pullDownRefresh) {
          return;
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`;
        } else {
          this.bubbleY = 0;
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`;
        }
      });
    },
    _initPullUpLoad() {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true;
        this.$emit('pullingUp');
      });
    },
  }
};
</script>

<style lang="scss">
.pulldown-wrapper{
  text-align: center;
}
.list-content{
  .list-item{
    padding: 10px;
    text-align: center;
    color: #666;
    &:nth-child(odd){
      background-color: #eee;
    }
  }
}
.pullup-wrapper{
  text-align: center;
}
</style>
