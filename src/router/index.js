import Vue from 'vue';
import { DemoRouter } from "./demo";
import Router from 'vue-router';
import Index from '@/views/index';
import Category from '@/views/category';
import About from '@/views/about';
import DemoList from '@/views/demoList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      meta: {index: 0},
      component: Index
    }, {
      path: "/category",
      name: "Category",
      meta: {index: 0},
      component: Category
    }, {
      path: "/demo",
      name: "DemoList",
      meta: {index: 0},
      component: DemoList
    }, {
      path: "/about",
      name: "About",
      meta: {index: 0},
      component: About
    }, ...DemoRouter
  ]
});
