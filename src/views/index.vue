<template>
  <div class="container">
    <card :header="{title: '我的钱包'}">
      <div slot="content" class="card-content">
        <div class="card-item vux-1px-r">
          <span class="card-item-num">1130</span>
          <p class="card-item-text">现金</p>
        </div>
        <div class="card-item vux-1px-r">
          <span class="card-item-num">10</span>
          <p class="card-item-text">微信</p>
        </div>
        <div class="card-item vux-1px-r">
          <span class="card-item-num">30</span>
          <p class="card-item-text">支付宝</p>
        </div>
        <div class="card-item">
          <span class="card-item-num">1030</span>
          <p class="card-item-text">银行卡</p>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { Card, Group, Cell } from "vux";

export default {
  data(){
    return {

    };
  },
  components: {
    Group,
    Cell,
    Card,
  },
  methods: {

  }
};

</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
.container{
  .card-content{
    display: flex;
    .card-item{
      flex: 1;
      text-align: center;
      font-size: 12px;
      margin: 10px 0;
      padding: 5px 0;
    }
    .card-item-num{
      color: #f74c31;
    }
    .card-item-text{
      color: #666;
    }
  }
}
</style>
