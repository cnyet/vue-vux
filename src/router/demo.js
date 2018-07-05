import PullUp from "@/components/pullUp";
import PullDown from "@/components/pullDown";
import PullUpAndDown from "@/components/pullUpAndDown";

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
}];
