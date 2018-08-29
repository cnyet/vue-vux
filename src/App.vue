<template>
  <div id="app" class="main-container">
    <view-box ref="viewBox" class="viewBox" body-padding-bottom="55px">
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
      <tabbar @on-index-change="changeTab" slot="bottom" v-show="showTabBar">
        <tabbar-item selected @on-item-click="clickTab">
          <fa-icon class="tabbar-icon" slot="icon" icon="coffee"></fa-icon>
          <span slot="label">咸鱼</span>
        </tabbar-item>
        <tabbar-item>
          <fa-icon class="tabbar-icon" slot="icon" icon="fish"></fa-icon>
          <span slot="label">鱼塘</span>
        </tabbar-item>
        <tabbar-item>
          <fa-icon class="tabbar-icon" slot="icon" icon="bell"></fa-icon>
          <span slot="label">发布</span>
        </tabbar-item>
        <tabbar-item>
          <fa-icon class="tabbar-icon" slot="icon" icon="comment"></fa-icon>
          <span slot="label">消息</span>
        </tabbar-item>
        <tabbar-item>
          <fa-icon class="tabbar-icon" slot="icon" icon="chess-knight"></fa-icon>
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
@import "./assets/styles/main.less";
</style>
