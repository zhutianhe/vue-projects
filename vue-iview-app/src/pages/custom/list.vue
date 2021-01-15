<template>
  <div class="demo-style">
    <h2>列表</h2>
    <h3>基础用法</h3>
    <div>
      <div class="source">
        <CustomList></CustomList>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CustomList: () => import('@/components/custom/list')
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
