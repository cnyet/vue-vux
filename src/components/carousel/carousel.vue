<template>
  <div class="carousel-container">
    <div class="carousel-wrap" ref="carousel">
      <div class="carousel-item"
        v-for="(item, index) in data"
        :key="index"
        :class="{active: activeArr[index]}"
        :style="{transform: `translateX(${translateArr[index]}px)`}"
        @mouseenter="stopCarousel"
        @mouseleave="startCarousel">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script src="./carousel.js"></script>
<style lang="less" src="./carousel.less"></style>
