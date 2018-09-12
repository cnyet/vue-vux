import util from "../../util";
import { XButton } from 'vux'
import Carousel from "../../components/carousel/carousel.vue";
export default {
  name: "Messages",
  components: {
    XButton,
    Carousel
  },
  data(){
    return {
      isCN: "default",
      isEN: "default",
    }
  },
  created(){
    console.log(this.$i18n.locale);
    if(this.$i18n.locale == "cn"){
      this.isCN = "primary";
    }
    if(this.$i18n.locale == "en"){
      this.isEN = "primary";
    }
  },
  methods: {
    changeLang(value){
      this.isCN = value=="cn" ? "primary" : "default";
      this.isEN = value=="en" ? "primary" : "default";
      this.$i18n.locale = value;
    }
  }
}
