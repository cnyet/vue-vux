<template>
  <div class="picker-wrapper">
    <transition name="fade">
      <div class="picker-mask" v-show="display" @click="hide"></div>
    </transition>
    <transition name="slide">
      <div class="picker-panel" v-show="display">
        <div class="picker-head">
          <span class="picker-cancel" @click="cancel">{{textCancel}}</span>
          <span class="picker-submit" @click="comfirm">{{textConfirm}}</span>
          <h4 class="picker-title">{{textTitle}}</h4>
        </div>
        <div class="picker-body">
          <div class="picker-body-top"></div>
          <div class="picker-body-bottom"></div>
          <div class="picker-body-wrapper" ref="wrapper">
            <div class="picker-group" v-for="(item, index) in pickerData" :key="index">
              <ul class="picker-group-scroll">
                <li class="picker-group-item" v-for="(n, i) in item" :key="i">{{n}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="./i-picker.js"></script>
<style lang="less" src="./i-picker.less"></style>
