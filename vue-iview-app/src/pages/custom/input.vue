<template>
  <div class="demo-style">
    <h2>输入框</h2>
    <h3>基础用法</h3>
    <div>
      <div class="source">
        <CustomInput :readonly="true" :value="value" placeholder="字段名称"></CustomInput>
      </div>
      <div class="meta">
        <div class="description"></div>
        <div class="highlight">
          <CustomInputMd></CustomInputMd>
        </div>
      </div>
    </div>
    <h3>文本域</h3>
    <div>
      <div class="source">
        <CustomInput
          type="textarea"
          :readonly="true"
          :value="value"
          placeholder="字段名称"
        ></CustomInput>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CustomInput: () => import('@/components/custom/input'),
    CustomInputMd: () => import('@/docs/custom/input.md')
  },
  props: {
  },
  data() {
    return {
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
