<template>
  <div class="container">
    <scroller
      :pullDownRefresh="pullDownRefresh"
      :pullUpLoad="pullUpLoad">

    </scroller>
  </div>
</template>

<script>
import { XHeader, Actionsheet, Group, Cell } from "vux";
import Scroller from "../components/Scroller";

export default {
  data(){
    return {
      lists: 20,
      pullDownRefresh: true,
      pullUpLoad: true,
    };
  },
  components: {
    Group,
    Cell,
    Scroller
  },
  created(){

  },
  mounted(){

  },
  watch: {

  },
  methods: {

  }
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.container{

}
</style>
