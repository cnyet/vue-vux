import { XHeader, Actionsheet, TransferDom, Card, Grid, GridItem, Flexbox, FlexboxItem, Icon, Swiper} from "vux";
import homeHeader from "../../components/header/header.vue";
import { BANNERURL, CATEGORYLIST } from "../../constants/localFiles";

export default {
  data(){
    return {
      swiperList: BANNERURL.map((item)=>{
        return {
          url: "javascript:",
          img: item
        };
      }),
      categoryList: CATEGORYLIST,
      cardList: []
    };
  },
  components: {
    XHeader,
    Actionsheet,
    TransferDom,
    Card,
    Grid,
    GridItem,
    Flexbox,
    FlexboxItem,
    Icon,
    Swiper,
    homeHeader
  },
  methods: {
    changeImg(){

    }
  }
};
