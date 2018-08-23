<template>
  <div class="notfound-container">
    <img class="notfound" src="../assets/images/notfound.png" alt="404">
    <div class="notfound-info">
      页面未找到请返回 <router-link to="/admin">首页</router-link>
    </div>
  </div>
</template>

<script>
export default{
  name: "notFound"
};
</script>

<style lang="less" scoped>
@import "../assets/styles/variable.less";
.notfound-container{
  margin: 100px;
  text-align: center;
  .notfound{
    width: 120px;
    height: auto;
  }
  .notfound-info{
    margin-top: 20px;
    color: @text-6;
  }
}
</style>
