import Vue from 'vue';
import { DemoRouter } from "./demo";
import Router from 'vue-router';
import Home from '@/views/home';
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
      meta: {index: 0},
      component: Category
    }, {
      path: "/demo",
      name: "demoList",
      meta: {index: 0},
      component: DemoList
    }, {
      path: "/about",
      name: "about",
      meta: {index: 0},
      component: About
    }, {
      path: "*",
      component: NotFound
    }, ...DemoRouter
  ]
});
