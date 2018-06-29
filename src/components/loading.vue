<template>
  <div v-transfer-dom>
    <loading class="loading" :show="isLoading" text="loading"></loading>
  </div>
</template>

<script>
import { TransferDom, Loading } from 'vux';
import { mapState } from 'vuex';

export default {
  directives: {
    TransferDom
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.loadState.isLoading
    })
  },
  created(){

  }
};

</script>

<style lang="less" scoped>
.loading{
  font-size: 14px;
}
</style>
