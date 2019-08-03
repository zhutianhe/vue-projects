/**
 * @description: 面包屑
 * @author: zth[zhutianhe136@163.com]
 * @date: 2019-07-28
*/
<template>
  <section class="bread">
    <div class="bread-wrap">
      <nav class>
        <a href="/">Home</a>
        <slot></slot>
      </nav>
    </div>
  </section>
</template>
<script>
export default {
  name: 'NavBread',
  components: {},
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped>
.bread {
  height: 45px;
  line-height: 45px;
  background-color: #f0f0f0;
}
.bread-wrap {
  padding: 0 10px;
  font-size: 14px;
  color: #a1a1a1;
}
.bread-wrap a {
  position: relative;
  margin-right: 20px;
}
.bread-wrap a:after {
  position: absolute;
  top: 0px;
  content: "/";
  height: 20px;
  line-height: 20px;
}
.bread-wrap span {
  color: #d1434a;
}
</style>
