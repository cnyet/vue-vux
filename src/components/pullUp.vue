<template>
  <div class="pullUp-container"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @touchcancel="touchCancel($event)"
    @mousedown="mouseDown($event)"
    @mousemove="mouseMove($event)"
    @mouseover="mouseOver($event)"
    @mouseout="mouseOut($event)"
    @mouseup="mouseUp($event)">
    <div class="wrap" v-for="(item, index) in list" :key="index">
      <div>{{item}}</div>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from "vux";
export default {
  data(){
    return {
      list: [1, 2, 3, 4, 5]
    };
  },
  components: {
    Group,
    Cell
  },
  methods: {
    touchStart(event){
      console.log(event.type);
    },
    touchMove(event){
      console.log(event.type);
    },
    touchEnd(event){
      console.log(event.type);
    },
    touchCancel(event){
      console.log(event.type);
    },
    mouseDown(event){
      console.log(event.type);
    },
    mouseMove(event){
      console.log(event.type);
    },
    mouseOver(event){
      console.log(event.type);
    },
    mouseOut(event){
      console.log(event.type);
    },
    mouseUp(event){
      console.log(event.type);
    },
  }
};
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.pullUp-container{
  background-color: #fff;
  .wrap{
    padding: 10px;
    text-align: center;
    color: #666;
    &:nth-child(odd){
      background-color: #eee;
    }
  }

}
</style>
