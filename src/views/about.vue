<template>
  <div class="container">
    <x-header
      class="header"
      :left-options="{showBack: false}"
      :right-options="{showMore: true}"
      title="我的"
      @on-click-more="showMenus = true">
    </x-header>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-show="showMenus" v-model="showMenus" show-cancel></actionsheet>
    </div>
    <panel header="图文组合列表"
      class="panel-wrap"
      :footer="footer"
      :list="list"
      type="1"
      @on-img-error="onImgError">
    </panel>
  </div>
</template>

<script>
import { XHeader, Actionsheet, TransferDom, Panel } from "vux";

export default {
  data(){
    return {
      menus: {
        menu1: '拍照',
        menu2: '从相册选照片'
      },
      showMenus: false,
      footer: {
        title: "更多",
        url: '#'
      },
      list: [
        {
          src: '#',
          fallbackSrc: 'https://dummyimage.com/60x60/ddd/fff',
          title: '标题一',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '#'
        }, {
          src: '#',
          fallbackSrc: 'https://dummyimage.com/60x60/ddd/fff',
          title: '标题二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            path: '#',
            replace: false
          }
        }
      ]
    };
  },
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet,
    TransferDom,
    Panel,
  },
  methods: {
    onImgError(item, $event){
      // console.log(item);
    }
  },
  created(){

  }
};
</script>

<style lang="less" scoped>
.panel-wrap{
  margin-top: 0;
}
</style>
