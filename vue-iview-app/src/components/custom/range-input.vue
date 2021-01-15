<template>
  <div class="range-input" :class="multiple ? 'multiple' : ''">
    <p class="range-input-item" v-for="(item, index) in rangeInputData" :key="index">
      <el-input
        v-model="item.startVal"
        :placeholder="`请输入开始${placeholder}`"
        class="input-inline"
      />
      <el-input
        v-model="item.endVal"
        :placeholder="`请输入结束${placeholder}`"
        class="input-inline"
      />
      <!-- <img v-if="multiple" src="@/assets/svg/add.svg" /> -->
      <i v-if="multiple" class="el-icon-plus" @click="handleAddRow()"></i>
      <i
        v-if="multiple"
        class="el-icon-delete"
        :style="{ cursor: rangeInputData.length === 1 ? 'not-allowed' : 'pointer' }"
        @click="handleDeleteRow(index)"
      ></i>
      <!-- <img src="@/assets/svg/delete.svg" /> -->
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      rangeInputData: [{ startVal: '', endVal: '' }]
    }
  },
  computed: {
  },
  watch: {
    rangeInputData: {
      handler(newVal) {
        const result = newVal.map((v) => {
          if (v.startVal && v.endVal) {
            return `${v.startVal}-${v.endVal}`
          } else if (v.startVal || v.endVal) {
            return `${v.startVal || v.endVal}`
          }
          // return `${v.startVal}${v.startVal && v.endVal && '-' + v.endVal}`
        })
        console.log(JSON.stringify(result))
        this.$emit('input', result.filter((n) => n).join(','))
      },
      deep: true
    }
  },
  created() {

  },
  mounted() {
    // 回显赋值
    const valueStrs = this.value ? this.value.split(',') : []
    valueStrs.map((v, i) => {
      const arr = v.split('-')
      this.$set(this.rangeInputData, i, { startVal: arr.length > 0 ? arr[0] : '', endVal: arr.length > 1 ? arr[1] : '' })
    })
  },
  methods: {
    // 删除行
    handleDeleteRow(index) {
      if (this.rangeInputData.length === 1) {
        return
      }
      this.rangeInputData.splice(index, 1)
    },

    // 添加行
    handleAddRow() {
      // 生成新的一行
      this.rangeInputData.push({ startVal: '', endVal: '' })
    },

    // 重置
    handleInputReset() {
      this.rangeInputData = [{ startVal: '', endVal: '' }]
    }
  }
}
</script>

<style lang="scss" scoped>
.range-input {
  width: calc(100% - 150px - 59px);
  float: left;
  height: 100%;
  .range-input-item {
    position: relative;
    padding: 4px 0px;
    ::v-deep .el-input {
      height: 25px;
      border-radius: 3px;
      font-size: 12px;
      display: inline-block;
      width: calc(50%);
      margin-left: -1px;
      input {
        height: 100%;
        border-radius: 0px 3px 3px 0px;
      }
      &:first-child {
        float: left;
        margin-left: 0px;
        input {
          height: 100%;
          border-radius: 3px 0px 0px 3px;
        }
      }
    }
    img {
      position: absolute;
      width: 20px;
      top: 6px;
      cursor: pointer;
      margin: 0px 5px;
      &:nth-child(3) {
        width: 14px;
        margin: 3px 8px;
        right: 25px;
      }
      &:last-child {
        right: 4px;
      }
    }
  }
}
.multiple {
  overflow: auto;
  height: auto;
  max-height: 102px;
  width: calc(100% - 150px);
  .range-input-item {
    ::v-deep .el-input {
      width: calc(50% - 29px);
    }
  }
  &::-webkit-scrollbar {
    width: 2px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(158, 174, 196, 0.15);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #9eaec4;
  }
  // &:hover::-webkit-scrollbar-thumb {
  //   background: rgba(255, 255, 255, 0.16);
  // }
}
</style>
