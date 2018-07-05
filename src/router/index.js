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
      component: Index
    }, {
      path: "/category",
      name: "Category",
      component: Category
    }, {
      path: "/about",
      name: "About",
      component: About
    }, {
      path: "/demo",
      name: "DemoList",
      component: DemoList
    }, ...DemoRouter
  ]
});
