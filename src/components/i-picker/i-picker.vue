<template>
  <div class="picker-wrapper">
    <transition name="fade">
      <div class="picker-mask" v-show="display" @click="hide"></div>
    </transition>
    <transition name="slide">
      <div :class="['picker-panel', showSearch ? 'hasSearch':'']" v-show="display">
        <div class="picker-head">
          <span class="picker-cancel" @click="cancel">{{textCancel}}</span>
          <span class="picker-submit" @click="comfirm">{{textConfirm}}</span>
          <h4 class="picker-title">{{textTitle}}</h4>
        </div>
        <div :class="['picker-body-search', showBtn ? 'active':'']" v-if="showSearch">
          <a :class="['picker-body-btn', showBtn ? 'visible':'']"
            v-show="showBtn"
            href="javascript:;"
            @click="toSearch">搜索
          </a>
          <div class="picker-search">
            <icon class="icon-search" type="search"></icon>
            <input class="mint-field-core"
              type="text"
              v-model="inputValue"
              @blur="blurInput"
              @focus="focusInput"
              autocomplete="off"
              placeholder="请输入关键字搜索">
          </div>
        </div>
        <div class="picker-body">
          <div class="picker-body-top"></div>
          <div class="picker-body-bottom"></div>
          <div class="picker-body-wrapper" ref="wrapper">
            <div class="picker-group" v-for="(item, index) in pickerData" :key="index">
              <ul class="wheel-scroll">
                <li class="wheel-item" v-for="(n, i) in item" :key="i">{{n}}</li>
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
