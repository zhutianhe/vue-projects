<template>
  <div ref="moveBox" class="table-all-operators" @mousedown="move">
    <div class="operator-icon1">
      <i class="el-icon-document-copy"></i>
    </div>
    <template v-for="(item, index) in options">
      <el-tooltip :key="index" effect="dark" :content="item.label" placement="left">
        <div class="operator-icon" @click="handleClick(item.code)">
          <i :class="item.icon"></i>
        </div>
      </el-tooltip>
    </template>
  </div>
</template>
<script>
export default {
  name: 'CstMovingToolsbar',
  props: {
    options: {
      type: [Array, String],
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    handleClick(code) {
      this.$emit('click', code)
    },
    move(e) {
      var box = this.$refs.moveBox
      var disX = e.clientX - box.offsetLeft
      var disY = e.clientY - box.offsetTop
      document.onmousemove = (e) => {
        var left = e.clientX - disX
        var top = e.clientY - disY
        box.style.left = left + 'px'
        box.style.top = top + 'px'
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        box.style.left = document.body.clientWidth - 44 + 'px'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.table-all-operators {
  position: fixed;
  z-index: 100;
  right: 0;
  top: 30%;
  width: 44px;
  background-color: #1d3a5a;
  color: #fff;
  line-height: 42px;
  border-radius: 22px 0 0 22px;
  text-align: center;
  overflow: hidden;
  /* padding-left: 10px; */
  .operator-icon {
    display: none;
    cursor: pointer;
  }
  &:hover {
    .operator-icon1 {
      background-color: #44b6ae;
      border-radius: 22px 0 0 0;
    }
    .operator-icon {
      display: block;
    }
  }
}
</style>
