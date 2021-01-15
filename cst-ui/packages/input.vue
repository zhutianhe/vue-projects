<template>
  <el-input
    v-model="inputValue"
    :type="type"
    :readonly="readonly"
    :placeholder="!inputFocus && placeholder"
    @focus="inputFocus = true"
  >
    <p v-show="inputFocus || value" slot="prepend">
      {{ placeholder }}
    </p>
  </el-input>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: this.value,
      inputFocus: false
    }
  },
  watch: {
    inputValue(newValue) {
      this.$emit('change', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.half-border {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  top: 0;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-input ::v-deep {
  .el-input__inner {
    height: 40px;
    border-radius: inherit;
    border-left: 2px solid rgba(255, 117, 117, 1) !important;
    &:focus {
      box-shadow: none;
    }
    &::before {
      @extend .half-border;
      border: 1px solid rgba(203, 213, 221, 1);
    }
  }
  .el-input-group__prepend {
    position: absolute;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #63758f;
    width: 60px;
    background-color: #ffffff;
    border: 2px solid #ffffff;
    text-align: center;
    padding: 0;
    top: -10px;
    left: 8px;
  }
}
</style>
