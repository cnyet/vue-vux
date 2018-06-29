<template>
  <div class="container">
    <panel header="图文组合列表"
      :footer="footer"
      :list="list"
      type="1"
      @on-img-error="onImgError"></panel>
  </div>
</template>

<script>
import { Panel } from "vux";

export default {
  data(){
    return {
      footer: {
        title: "更多",
        url: '#'
      },
      list: [
        {
          src: 'http://somedomain.somdomain/x.jpg',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '#'
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
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
  components: {
    Panel,
  },
  methods: {
    onImgError(item, $event){
      console.log(item);
    }
  }
};
</script>

<style lang="less" scoped>

</style>
