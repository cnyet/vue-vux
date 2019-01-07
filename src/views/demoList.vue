<template>
  <div class="container">
    <group class="group-wrap" label-width="4.5em" label-margin-right="2em" label-align="left">
      <cell title="上拉加载" value="pullUp" link="/pullup" @click.native="updateTabBar" is-link></cell>
      <cell title="下拉刷新" value="pullDown" link="/pullDown" is-link value-align="left"></cell>
      <cell title="上拉下拉" value="pullUpAndDown" link="/pullUpAndDown" is-link value-align="left"></cell>
      <cell title="scroll" value="iscroll" link="/iscroll" is-link value-align="left"></cell>
      <cell title="按钮" value="button" link="/button" is-link value-align="left"></cell>
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
  .group-wrap{
    .weui-cells{
      font-size: 0.875rem;
    }
  }
}
</style>
