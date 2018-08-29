import Vue from 'vue';
import { DemoRouter } from "./demo";
import Router from 'vue-router';
import Home from '@/views/home/home.vue';
import Category from '@/views/category';
import About from '@/views/about';
import DemoList from '@/views/demoList';
import NotFound from '@/views/notfound';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {index: 0},
      component: Home
    }, {
      path: "/category",
      name: "category",
      component: Category
    }, {
      path: "/demo",
      name: "demoList",
      component: DemoList
    }, {
      path: "/about",
      name: "about",
      component: About
    }, {
      path: "*",
      component: NotFound
    }, ...DemoRouter
  ]
});
