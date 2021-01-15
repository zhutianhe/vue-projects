<template>
  <div class="custom-textarea">
    <el-input
      v-model="inputValue"
      :readonly="readonly"
      :class="type === 'noborder' ? 'no-border' : ''"
      type="textarea"
      :placeholder="!inputFocus && placeholder"
      @focus="inputFocus = true"
    >
    </el-input>
    <p v-show="(inputFocus || value) && type === 'normal'" class="custom-input-prepend">
      {{ placeholder }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    // 默认normal， 可选noborder(无边框)
    type: {
      type: String,
      default: 'normal'
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
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
.custom-textarea {
  position: relative;
}
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

.el-textarea ::v-deep {
  height: 100%;
  .el-textarea__inner {
    height: 100%;
    border-radius: inherit;
    border-left: 2px solid #cdd3da;
    &:focus {
      box-shadow: none;
    }
    &::before {
      @extend .half-border;
      border: 1px solid rgba(203, 213, 221, 1);
    }
  }
}

.no-border ::v-deep {
  padding: 10px;
  .el-textarea__inner {
    border: none !important;
    padding: 0;
  }
}

.custom-input-prepend {
  position: absolute;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #63758f;
  width: 60px;
  height: 20px;
  background-color: #ffffff;
  text-align: center;
  padding: 0;
  top: -15px;
  left: 8px;
}
</style>
