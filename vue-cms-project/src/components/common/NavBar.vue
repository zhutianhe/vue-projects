<template>
  <div>
    <mt-header :title="title">
      <div @click="goBack" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>
<script>
export default {
  name: 'nav-bar',
  props: ['title'],
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>

</style>
