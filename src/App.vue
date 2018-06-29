<template>
  <div id="app">
    <router-view></router-view>
    <tabbar @on-index-change="changeTab">
      <tabbar-item selected @on-item-click="clickTab">
        <fa-icon slot="icon" name="adjust"></fa-icon>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item>
        <fa-icon slot="icon" name="basketball-ball"></fa-icon>
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item>
        <fa-icon slot="icon" name="bell"></fa-icon>
        <span slot="label">关于</span>
      </tabbar-item>
    </tabbar>
    <loading></loading>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
import Loading from "./components/loading";
export default {
  name: 'App',
  data(){
    return {

    };
  },
  components: {
    Tabbar,
    TabbarItem,
    Loading
  },
  methods: {
    changeTab(index){
      if(index == 0){
        this.$router.push({
          name: "Index"
        });
      }else if(index == 1){
        this.$router.push({
          name: "Category"
        });
      }else if(index == 2){
        this.$router.push({
          name: "About"
        });
      }else{}
    },
    clickTab(item){
      console.log("首页");
    }
  },
  created(){

  }
};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
body{
  background-color: #fbf9fe;
}
.fa-icon {
  width: auto;
  height: 1.4rem; /* 或任意其它字体大小相对值 */
  /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
  max-width: 100%;
  max-height: 100%;
}
</style>
