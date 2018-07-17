<template>
  <div class="container">
    <my-scroll :page="page" @on-refresh="onRefresh" @on-pull="onPull">
      <div slot="scrollList">
        <ul>
          <li class="wrap" v-for="(item, index) in list" :key="index">{{item}}</li>
        </ul>
      </div>
    </my-scroll>
  </div>
</template>

<script>
import myScroll from "./pullUpAndDown.vue";

export default {
  data(){
    return {
      list: 15,
      page: {
        counter: 1,
        pageStart: 1,
        pageEnd: 1,
        total: 10
      }
    };
  },
  components: {
    myScroll
  },
  methods: {
    onRefresh(num){
      setTimeout(()=>{
        this.$root.$emit("setState", 3);
      }, 500);
    },
    onPull(){
      console.log("loadmore");
      setTimeout(()=>{
        this.list += 10;
      }, 500);
    }
  },
  mounted(){

  },
  created(){

  }
};
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
.container{
  position: relative;
  overflow: hidden;
  height: 100%;
  .pullDown-wrap{
    height: 30px;
    text-align: center;
    width: 100%;
    position: absolute;
    top: -30px;
    left: 0;
  }
  .content{
    height: 101%;
  }
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
