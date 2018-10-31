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
          <x-icon type="ios-home-outline"  slot="icon" size="30"></x-icon>
          <span slot="label">{{ $t("tabbar.home") }}</span>
        </tabbar-item>
        <tabbar-item>
          <x-icon type="ios-flower-outline" slot="icon" size="30"></x-icon>
          <span slot="label">{{ $t("tabbar.exchange") }}</span>
        </tabbar-item>
        <tabbar-item>
          <x-icon type="ios-plus-outline" slot="icon" size="30"></x-icon>
          <span slot="label">{{ $t("tabbar.publish") }}</span>
        </tabbar-item>
        <tabbar-item>
          <x-icon type="ios-chatbubble-outline" slot="icon" size="30"></x-icon>
          <span slot="label">{{ $t("tabbar.messages") }}</span>
        </tabbar-item>
        <tabbar-item>
          <x-icon type="ios-person-outline" slot="icon" size="30"></x-icon>
          <span slot="label">{{ $t("tabbar.about") }}</span>
        </tabbar-item>
      </tabbar>
    </view-box>
    <loading></loading>
  </div>
</template>

<script>
//组件z-index层次: Toast > Dialog > Popup > Mask > Tabbar
import { Radio, Group, Cell, ViewBox, Tabbar, TabbarItem, Icon } from "vux";
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
    Loading,
    Icon
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
          name: "message"
        });
      }else if(index == 4){
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
    },
    beforeunloadHandler(e) {
      e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
        e.returnValue = '关闭提示';
      }
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return '关闭提示';
    }
  },
  created(){

  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e));
    });
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e));
  }
};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import "./assets/styles/main.less";
</style>
