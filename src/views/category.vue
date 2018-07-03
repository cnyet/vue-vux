<template>
  <div class="container">
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <cell title="分类一" value="value" is-link></cell>
      <cell title="分类二" value="value" is-link value-align="left"></cell>
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

  }
};
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';

</style>
