<template>
  <div class="custom-label">
    <span>{{ index }}</span>
    <span>/</span>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-label {
  position: absolute;
  left: -162px;
  top: 0px;
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
