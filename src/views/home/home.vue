<template>
  <div class="home-container">
    <div class="view-header">
      <home-header></home-header>
    </div>
    <swiper :list="swiperList" auto loop dots-position="center" height="7.5rem" @on-index-change="changeImg"></swiper>
    <grid class="home-grid" :cols="5" :show-vertical-dividers="false" :show-lr-borders="false">
      <grid-item class="grid-item" :label="item.name" v-for="(item, index) in categoryList" :key="index">
        <img class="grid-icon" slot="icon" :src="item.icon">
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
    <card class="card-wrap">
      <div slot="header">
        <flexbox justify="space-around">
          <flexbox-item class="card-title">卖闲置能换钱</flexbox-item>
          <flexbox-item class="card-tips">刚刚发布<span>375</span>件闲置</flexbox-item>
        </flexbox>
      </div>
      <div slot="content">
        <flexbox class="card-group" :gutter="10">
          <flexbox-item class="card-item item1">
            <img class="card-img" src="../../assets/images/card01.png" alt="">
            <p class="card-title">发布闲置</p>
            <p class="card-desc">30秒发布宝贝</p>
          </flexbox-item>
          <flexbox-item class="card-item item2">
            <img class="card-img" src="../../assets/images/card02.png" alt="">
            <p class="card-title">一键转卖</p>
            <p class="card-desc">网购宝贝一键发布</p>
          </flexbox-item>
          <flexbox-item class="card-item item3">
            <img class="card-img" src="../../assets/images/card03.png" alt="">
            <p class="card-title">信用速卖</p>
            <p class="card-desc">急速回收秒变现</p>
          </flexbox-item>
        </flexbox>
      </div>
    </card>
  </div>
</template>

<script src="./home.js"></script>
<style lang="less" src="./home.less"></style>
