<template>
  <div id="app" class="main-container">
    <drawer :show.sync="drawerVisibility"
      :show-mode="showModeValue"
      :placement="showPlacementValue">
      <div slot="drawer">
        <group title="Drawer demo(beta)" style="margin-top:20px;">
          <cell title="演示" link="/" @click.native="drawerVisibility = false">
          </cell>
          <cell title="导航" link="/" @click.native="drawerVisibility = false">
          </cell>
        </group>
        <group title="showMode">
          <radio v-model="showMode" :options="['push', 'overlay']" @on-change="onShowModeChange"></radio>
        </group>
        <group title="placement">
          <radio v-model="showPlacement" :options="['left', 'right']" @on-change="onPlacementChange"></radio>
        </group>
      </div>
      <view-box ref="viewBox" class="viewBox" body-padding-top="46px" body-padding-bottom="55px">
        <x-header
          class="header"
          :left-options="leftOptions"
          :right-options="rightOptions"
          @on-click-more="showMenus = true">
          <span>{{viewTitle}}</span>
          <x-icon slot="left"
            v-show="showDrawIcon"
            type="navicon"
            size="35"
            @click="drawerVisibility = !drawerVisibility"
            style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
        </x-header>
        <div v-transfer-dom>
          <actionsheet :menus="menus" v-show="showMenus" v-model="showMenus" show-cancel></actionsheet>
        </div>
        <transition :name="transitionName" mode="out-in" appear>
          <router-view></router-view>
        </transition>
        <tabbar @on-index-change="changeTab" slot="bottom" v-show="showTabBar">
          <tabbar-item selected @on-item-click="clickTab">
            <fa-icon slot="icon" name="adjust"></fa-icon>
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item>
            <fa-icon slot="icon" name="basketball-ball"></fa-icon>
            <span slot="label">分类</span>
          </tabbar-item>
          <tabbar-item>
            <fa-icon slot="icon" name="chess-knight"></fa-icon>
            <span slot="label">演示</span>
          </tabbar-item>
          <tabbar-item>
            <fa-icon slot="icon" name="bell"></fa-icon>
            <span slot="label">关于</span>
          </tabbar-item>
        </tabbar>
      </view-box>
    </drawer>
    <loading></loading>
  </div>
</template>

<script>
//组件z-index层次: Toast > Dialog > Popup > Mask > Tabbar
import { XHeader, Actionsheet, TransferDom, Radio, Group, Cell, ViewBox, Drawer, Tabbar, TabbarItem } from "vux";
import Loading from "./components/loading";
import mixin from "./util/mixin";

export default {
  name: 'App',
  mixins: [mixin],
  data(){
    return {
      transitionName: "",
      menus: {
        menu1: '拍照',
        menu2: '从相册选择'
      },
      viewTitle: "首页",
      showDrawIcon: false,
      leftOptions: {
        showBack: false
      },
      rightOptions: {
        showMore: false
      },
      showMenus: false,
      drawerVisibility: false,
      showMode: 'push',
      showModeValue: "push",
      showPlacement: 'left',
      showPlacementValue: "left"
    };
  },
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet,
    TransferDom,
    Radio,
    Group,
    Cell,
    ViewBox,
    Drawer,
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
          name: "Index"
        });
        this.viewTitle = "首页";
        this.showDrawIcon = true;
        this.leftOptions.showBack = false;
        this.rightOptions.showMore = false;
      }else if(index == 1){
        this.$router.push({
          name: "Category"
        });
        this.viewTitle = "分类";
        this.showDrawIcon = false;
        this.leftOptions.showBack = true;
        this.rightOptions.showMore = false;
      }else if(index == 2){
        this.$router.push({
          name: "DemoList"
        });
        this.viewTitle = "演示";
        this.showDrawIcon = false;
        this.leftOptions.showBack = true;
        this.rightOptions.showMore = false;
      }else if(index == 3){
        this.$router.push({
          name: "About"
        });
        this.viewTitle = "关于";
        this.showDrawIcon = false;
        this.leftOptions.showBack = false;
        this.rightOptions.showMore = true;
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
  }
}
.fa-icon {
  width: auto;
  height: 1.4rem; /* 或任意其它字体大小相对值 */
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
