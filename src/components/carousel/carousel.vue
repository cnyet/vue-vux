<template>
  <div class="carousel-container">
    <div class="carousel-wrap" ref="carousel">
      <div class="carousel-item"
        v-for="(item, index) in item"
        :key="index"
        :class="{ active : index == currentIndex }"
        :style="{ transform: `translateX( ${translateArr[index]}px)` }">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script src="./carousel.js"></script>
<style lang="less" src="./carousel.less"></style>
