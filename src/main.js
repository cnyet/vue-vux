// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import FastClick from 'fastclick';
import store from "./store";   //引入vuex状态管理
import VueI18n from "vue-i18n";
import util from "./util";
import zh_cn from "./assets/lang/cn.json";
import en_us from "./assets/lang/en.json";

//使用微信 jssdk 和基于 Axios 封装的 AjaxPlugin
import { WechatPlugin, AjaxPlugin } from 'vux';
//移除移动端页面点击延迟
// FastClick.attach(document.body);
Vue.use(WechatPlugin);
Vue.use(AjaxPlugin);
Vue.use(VueI18n);
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
  if (/^\/demo/.test(to.path)) {
    store.commit("updateTabBar", false);
  } else {
    store.commit("updateTabBar", true);
  }
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
/* 定义全局全球化 */
const i18n = new VueI18n({
  locale: util.getLang(),
  messages : {
    en: en_us,
    cn: zh_cn
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
});
