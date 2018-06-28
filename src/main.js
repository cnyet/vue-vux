// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import FastClick from 'fastclick';
//全局注册图标
import 'vue-awesome/icons';
import FaIcon from 'vue-awesome/components/Icon';
//使用微信 jssdk 和基于 Axios 封装的 AjaxPlugin
import { WechatPlugin, AjaxPlugin, Tabbar, TabbarItem } from 'vux';
//移除移动端页面点击延迟
FastClick.attach(document.body);
Vue.use(WechatPlugin);
Vue.use(AjaxPlugin);
//全局注册组件
Vue.component('tabbar', Tabbar);
Vue.component('tabbar-item', TabbarItem);
Vue.component('fa-icon', FaIcon);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
