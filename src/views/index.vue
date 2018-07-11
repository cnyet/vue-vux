<template>
  <div class="container">
    <div class="view-header">
      <x-header class="header" :left-options="{showBack: false}">
        <div slot="left">
          <fa-icon name="map-marker-alt"></fa-icon>
          <span class="location">上海</span>
        </div>
        <span class="head-title">首页</span>
        <x-icon slot="right" class="icon-color" type="ios-search-strong" size="24"></x-icon>
      </x-header>
    </div>
    <grid class="home-grid" :cols="4" :show-vertical-dividers="false" :show-lr-borders="false">
      <grid-item class="grid-item">
        <fa-icon class="fa-icon" slot="icon" name="balance-scale"></fa-icon>
        <span class="grid-label" slot="label">二手手机</span>
      </grid-item>
      <grid-item class="grid-item">
        <fa-icon class="fa-icon" slot="icon" name="birthday-cake"></fa-icon>
        <span class="grid-label" slot="label">3C数码</span>
      </grid-item>
      <grid-item class="grid-item">
        <fa-icon class="fa-icon" slot="icon" name="box-open"></fa-icon>
        <span class="grid-label" slot="label">游戏交易</span>
      </grid-item>
      <grid-item class="grid-item">
        <fa-icon class="fa-icon" slot="icon" name="cart-plus"></fa-icon>
        <span class="grid-label" slot="label">母婴玩具</span>
      </grid-item>
      <grid-item class="grid-item">
        <fa-icon class="fa-icon" slot="icon" name="bullhorn"></fa-icon>
        <span class="grid-label" slot="label">家具家电</span>
      </grid-item>
      <grid-item class="grid-item">
        <fa-icon class="fa-icon" slot="icon" name="chess-king"></fa-icon>
        <span class="grid-label" slot="label">服饰鞋包</span>
      </grid-item>
      <grid-item class="grid-item">
        <fa-icon class="fa-icon" slot="icon" name="chess-queen"></fa-icon>
        <span class="grid-label" slot="label">美妆捡漏</span>
      </grid-item>
      <grid-item class="grid-item">
        <fa-icon class="fa-icon" slot="icon" name="child"></fa-icon>
        <span class="grid-label" slot="label">二手车</span>
      </grid-item>
    </grid>
    <div class="flexbox-group">
      <flexbox class="flexbox-list" :gutter="10">
        <flexbox-item class="flexbox-item item1">
          <div>逛同城</div>
          <p class="flexbox-desc">17.6万人在线</p>
        </flexbox-item>
        <flexbox-item class="flexbox-item item2">
          <div>免费送</div>
          <p class="flexbox-desc">18万件宝贝</p>
        </flexbox-item>
        <flexbox-item class="flexbox-item item3">
          <div>咸鱼币</div>
          <p class="flexbox-desc">福利天天有</p>
        </flexbox-item>
      </flexbox>
    </div>

  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, Grid, GridItem, Flexbox, FlexboxItem, Icon} from "vux";

export default {
  data(){
    return {

    };
  },
  components: {
    XHeader,
    Actionsheet,
    TransferDom,
    Grid,
    GridItem,
    Flexbox,
    FlexboxItem,
    Icon
  },
  methods: {

  }
};

</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import "../assets/variable.less";

.container{
  .view-header{
    height: 240px;
    background-image: url("../assets/homeBg.jpg");
    background-repeat: no-repeat;
    background-position: center;
  }
  .header{
    color: #fff;
    background: linear-gradient(to bottom, rgba(0,0,0,.6) 10%, rgba(0,0,0,.3) 50%, rgba(0,0,0,0) 100%);
    .icon-color{
      fill: #fff;
    }
    .location{
      display: inline-block;
    }
    .head-title{
      font-weight: 300;
      font-size: 1rem;
    }
  }
  .home-grid{
    margin-top: 10px;
    background-color: #fff;
    &:before{
      border-top: 0;
      height: 0;
    }
    .grid-item{
      background-color: #fff;
      padding-top: 15px;
      padding-bottom: 15px;
      &:after{
        border-bottom: 0;
        height: 0;
      }
    }
    .fa-icon{
      fill: @text-default;
      height: 28px;
      border-radius: 50%;
    }
    .grid-label{
      color: @text-6;
    }
  }
  .flexbox-group{
    margin-top: 10px;
    padding: 15px;
    background-color: #fff;
  }
  .flexbox-item{
    height: 40px;
    font-size: 0.875rem;
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    &.item1{
      background-color: #66CCFF;
    }
    &.item2{
      background-color:#CC6633;
    }
    &.item3{
      background-color: #6666FF;
    }
    .flexbox-desc{
      color: #f0f0f0;
      font-size: 0.6rem;
    }
  }
}
</style>
