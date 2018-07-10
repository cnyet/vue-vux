import PullUp from "@/components/pullUp";
import PullDown from "@/components/pullDown";
import PullUpAndDown from "@/components/pullUpAndDown";

export const DemoRouter = [{
  path: "/pullup",
  name: "PullUp",
  meta: {index: 1},
  component: PullUp
}, {
  path: "/pullDown",
  name: "PullDown",
  meta: {index: 1},
  component: PullDown
}, {
  path: "/pullUpAndDown",
  name: "PullUpAndDown",
  meta: {index: 1},
  component: PullUpAndDown
}];
