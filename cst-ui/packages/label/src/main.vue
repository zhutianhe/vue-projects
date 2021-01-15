<template>
  <div class="custom-label">
    <span>{{ index }}</span>
    <span>/</span>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'CustomLabel',
  props: {
    index: {
      type: String,
      default: '0'
    },
    title: {
      type: String,
      default: '1'
    }
  }
};
</script>

<style lang="less" scoped>
.custom-label {
  span {
    font-family: PingFangSC-Medium;
    color: #63758f;
    &:nth-child(1) {
      font-family: AquaGrotesque;
      font-size: 30px;
    }
    &:nth-child(2) {
      font-size: 24px;
    }
    &:nth-child(3) {
      font-size: 14px;
    }
  }
}
</style>
