<template>
  <div class="messages-container">
    <p>{{ $t("message.hello") }}</p>
    <select v-model="$i18n.local">
      <option value="cn">中文</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script src="./messages.js"></script>
<style lang="less" src="./messages.less"></style>
