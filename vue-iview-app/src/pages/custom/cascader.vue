<template>
  <div class="demo-style">
    <h2>选择器</h2>
    <h3>基础用法</h3>
    <div>
      <div class="source">
        <CustomCascader :options="options"></CustomCascader>
      </div>
    </div>
    <h3>多选</h3>
    <div>
      <div class="source">
        <CustomCascader :options="options" :multiple="true"></CustomCascader>
      </div>
    </div>
    <h3>级联</h3>
    <div>
      <div class="source">
        <CustomCascader :options="options" :multiple="true"></CustomCascader>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CustomCascader: () => import('@/components/custom/cascader')
  },
  props: {

  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
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
