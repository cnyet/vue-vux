<template>
  <div id="app" class="main-container">
    <view-box ref="viewBox" class="viewBox" body-padding-bottom="55px">
      <transition :name="transitionName" mode="out-in" appear>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
      <tabbar @on-index-change="changeTab" slot="bottom" v-show="showTabBar">
        <tabbar-item selected @on-item-click="clickTab">
          <fa-icon class="tabbar-icon" slot="icon" name="home"></fa-icon>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item>
          <fa-icon class="tabbar-icon" slot="icon" name="basketball-ball"></fa-icon>
          <span slot="label">分类</span>
        </tabbar-item>
        <tabbar-item>
          <fa-icon class="tabbar-icon" slot="icon" name="bell"></fa-icon>
          <span slot="label">消息</span>
        </tabbar-item>
        <tabbar-item>
          <fa-icon class="tabbar-icon" slot="icon" name="chess-knight"></fa-icon>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
    <loading></loading>
  </div>
</template>

<script>
//组件z-index层次: Toast > Dialog > Popup > Mask > Tabbar
import { Radio, Group, Cell, ViewBox, Tabbar, TabbarItem } from "vux";
import Loading from "./components/loading";
import mixin from "./util/mixin";

export default {
  name: 'App',
  mixins: [mixin],
  data(){
    return {
      transitionName: "",
      showDrawIcon: false,
      showMenus: false,
      drawerVisibility: false,
      showMode: 'push',
      showModeValue: "push",
      showPlacement: 'left',
      showPlacementValue: "left"
    };
  },
  components: {
    Radio,
    Group,
    Cell,
    ViewBox,
    Tabbar,
    TabbarItem,
    Loading
  },
  watch: {
    $route(to, from){
      if(to.meta.index >= from.meta.index){
        this.transitionName = "slide-left";
      }else{
        this.transitionName = "slide-right";
      }
    }
  },
  methods: {
    changeTab(index){
      if(index == 0){
        this.$router.push({
          name: "home"
        });
        this.showDrawIcon = true;
      }else if(index == 1){
        this.$router.push({
          name: "category"
        });
        this.showDrawIcon = false;
      }else if(index == 2){
        this.$router.push({
          name: "demoList"
        });
        this.showDrawIcon = false;
      }else if(index == 3){
        this.$router.push({
          name: "about"
        });
        this.showDrawIcon = false;
      }else{}
    },
    clickTab(item){
      console.log("首页");
    },
    onShowModeChange (val) {
      this.drawerVisibility = false;
      setTimeout(one => {
        this.showModeValue = val;
      }, 400);
    },
    onPlacementChange (val) {
      this.drawerVisibility = false;
      setTimeout(one => {
        this.showPlacementValue = val;
      }, 400);
    },
    goBack(){
      const pathIndex = this.$route.meta.index;
      if(pathIndex == 0 && this.$route.path != "/"){
        this.$router.push({
          name: "home"
        });
        this.showDrawIcon = true;
      }else{
        history.back();
      }
    }
  },
  created(){

  }
};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
body{
  background-color: #fbf9fe;
}
.main-container{
  height: 100%;
  .header{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
  .viewBox{
    z-index: 1;
    .tabbar-icon{
      margin-top: 5px;
    }
  }
}
.weui-tabbar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon{
  color: #FB0039;
}
.fa-icon {
  vertical-align: top;
  width: auto;
  height: 1.2rem; /* 或任意其它字体大小相对值 */
  /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
  max-width: 100%;
  max-height: 100%;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active{
  will-change: transition;
  transition: all .2s ease;
}
.slide-right-enter{
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-left-enter{
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

</style>
