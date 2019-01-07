import PullUp from "@/components/pullUp";
import PullDown from "@/components/pullDown";
import PullUpAndDown from "@/components/pullUpAndDown";
import IScroll from "@/components/Scroller";
import IButton from '@/components/i-button/i-button.vue';

export const DemoRouter = [{
  path: "/pullup",
  name: "PullUp",
  component: PullUp
}, {
  path: "/pullDown",
  name: "PullDown",
  component: PullDown
}, {
  path: "/pullUpAndDown",
  name: "PullUpAndDown",
  component: PullUpAndDown
}, {
  path: "/iscroll",
  name: "IScroll",
  component: IScroll
}, {
  path: "/button",
  name: 'Button',
  component: IButton
}];
