<template>
  <div class="container">
    <scroller
      ref="scroll"
      :data="lists"
      :pullDownRefresh="pullDownRefresh"
      :pullUpLoad="pullUpLoad"
      @pullingDown="onPullingDown"
      @pullingUp="onPullingUp"
      @tap="tapItem">
    </scroller>
  </div>
</template>

<script>
import { XHeader, Actionsheet, Group, Cell } from "vux";
import Scroller from "../components/Scroller";

export default {
  data(){
    return {
      lists: [1,2,3,4,5],
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
  methods: {
    onPullingDown(){
      setTimeout(()=>{
        this.lists = [1,2,3,4,5];
      }, 1000);
    },
    onPullingUp(){
      setTimeout(()=>{
        if (Math.random() > 0.5){
          for(let i=0; i<10; i++){
            this.lists.push("new data: "+i);
          }
        }else{
          this.$refs.scroll.forceUpdate(false);
        }
      }, 1000);
    },
    tapItem(item){
      console.log(item);
    }
  }
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.container{

}
</style>
