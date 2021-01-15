<template>
  <div class="demo-style">
    <h2>倒计时</h2>
    <h3>基础用法</h3>
    <div>
      <div class="source">
        <CustomTimedown></CustomTimedown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CustomTimedown: () => import('@/components/custom/timedown')
  },
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
</style>
