<template>
  <div class="container">
    <div class="group-head">demo列表</div>
    <group class="group-wrap" label-width="4.5em" label-margin-right="2em" label-align="left">
      <cell title="上拉加载" value="pullUp" link="/demo/pullup" @click.native="updateTabBar" is-link></cell>
      <cell title="下拉刷新" value="pullDown" link="/demo/pullDown" is-link value-align="left"></cell>
      <cell title="上拉下拉" value="pullUpAndDown" link="/demo/pullUpAndDown" is-link value-align="left"></cell>
      <cell title="scroll" value="iscroll" link="/demo/iscroll" is-link value-align="left"></cell>
      <cell title="按钮" value="button" link="/demo/button" is-link value-align="left"></cell>
      <cell title="弹出层" value="picker" link="/demo/picker" is-link value-align="left"></cell>
    </group>
  </div>
</template>

<script>
import { XHeader, Actionsheet, Group, Cell } from "vux";
export default {
  data(){
    return {

    };
  },
  components: {
    Group,
    Cell,
  },
  methods: {
    updateTabBar(){
      // this.$store.commit("updateTabBar", false);
    }
  }
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.container{
  .group-head{
    padding: 0.625rem;
  }
  .group-wrap{
    .weui-cells{
      font-size: 0.875rem;
    }
  }
}
</style>
