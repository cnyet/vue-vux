<template>
  <div class="messages-container">
    <x-button mini :type="isCN" @click.native="changeLang('cn')">CN</x-button>
    <x-button mini :type="isEN" @click.native="changeLang('en')">EN</x-button>
    <p class="messages-content">当前语言是：{{ $t("language") }}</p>
    <p class="messages-content">{{ $t("message.hello") }}</p>
  </div>
</template>

<script src="./messages.js"></script>
<style lang="less" src="./messages.less"></style>
