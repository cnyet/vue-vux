import { mapState } from "vuex";

export default {
  //生成计算属性
  computed: {
    ...mapState([
      "showTabBar",
    ])
  }
};
