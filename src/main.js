// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import FastClick from 'fastclick';
import store from "./store";   //引入vuex状态管理
//全局注册图标
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faCoffee);
//使用微信 jssdk 和基于 Axios 封装的 AjaxPlugin
import { WechatPlugin, AjaxPlugin } from 'vux';
//移除移动端页面点击延迟
FastClick.attach(document.body);
Vue.use(WechatPlugin);
Vue.use(AjaxPlugin);
//全局注册font-awesome图标组件
Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

//注册module保存loading状态
store.registerModule("loadState", {
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadState(state, newLoad){
      state.isLoading = newLoad.isLoading;
    }
  }
});

router.beforeEach((to, from, next) => {
  store.commit("updateLoadState", {
    isLoading: true
  });
  next();
});

router.afterEach((to, from, next) => {
  store.commit("updateLoadState", {
    isLoading: false
  });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App),
});
