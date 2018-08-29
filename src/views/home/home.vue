<template>
  <div class="home-container">
    <div class="view-header">
      <home-header></home-header>
    </div>
    <swiper :list="swiperList" auto loop dots-position="center" height="120px" @on-index-change="changeImg"></swiper>
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

  </div>
</template>

<script src="./home.js"></script>
<style lang="less" src="./home.less"></style>
