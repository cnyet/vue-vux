import Vue from 'vue';
import { DemoRouter } from "./demo";
import Router from 'vue-router';
import Home from '@/views/home/home.vue';
import Category from '@/views/category';
import About from '@/views/about';
import Demo from '@/views/demo.vue';
import NotFound from '@/views/notfound';
import Message from "@/views/messages/messages.vue";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   meta: {index: 0},
    //   component: Home
    // },
    {
      path: "/category",
      name: "category",
      component: Category
    }, {
      path: "/demo",
      component: Demo,
      children:  DemoRouter
    }, {
      path: "/message",
      name: "message",
      component: Message
    }, {
      path: "/about",
      name: "about",
      component: About
    }, {
      path: "*",
      component: NotFound
    }
  ]
});
