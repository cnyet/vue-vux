<template>
  <div class="container">
    <tabbar @on-index-change="changeValue">
      <tabbar-item selected>
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
  </div>
</template>

<script>
import { Group, Cell } from "vux";

export default {
  data(){
    return {

    }
  },
  components: {
    Group,
    Cell,
  },
  methods: {
    changeValue(){
      console.log("change");
    }
  }
}

</script>

<style lang="scss" scoped>
.container{

}
.fa-icon {
  width: auto;
  height: 1.4rem; /* 或任意其它字体大小相对值 */
  /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
  max-width: 100%;
  max-height: 100%;
}
</style>
