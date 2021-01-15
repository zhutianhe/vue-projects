<template>
  <ul class="custom-list">
    <li v-for="item in options" :key="item.key">
      <label for="">{{ item.label }}</label>
      <el-input :value="item.value" v-if="readonly" :readonly="readonly"></el-input>
      <el-select v-else :value="item.value" :placeholder="selectHolder">
        <el-option
          v-for="optionItem in item.options"
          :key="optionItem.value"
          :label="optionItem.label"
          :value="optionItem.value"
        ></el-option>
      </el-select>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [
          {
            key: 'resultType',
            label: '结果类型',
            value: '1',
            options: [
              {
                label: '选项一',
                value: '1'
              },
              {
                label: '选项二',
                value: '2'
              },
              {
                label: '选项三',
                value: '3'
              },
              {
                label: '选项四',
                value: '4'
              }
            ]
          },
          {
            key: 'level',
            label: '风险等级',
            value: '2',
            options: [
              {
                label: '选项一',
                value: '1'
              },
              {
                label: '选项二',
                value: '2'
              },
              {
                label: '选项三',
                value: '3'
              },
              {
                label: '选项四',
                value: '4'
              }
            ]
          },
          {
            key: 'attackType',
            label: '攻击方式',
            value: '4',
            options: [
              {
                label: '选项一',
                value: '1'
              },
              {
                label: '选项二',
                value: '2'
              },
              {
                label: '选项三',
                value: '3'
              },
              {
                label: '选项四',
                value: '4'
              }
            ]
          },
          {
            key: 'attackChain',
            label: '杀伤阶段',
            value: '3',
            options: [
              {
                label: '选项一',
                value: '1'
              },
              {
                label: '选项二',
                value: '2'
              },
              {
                label: '选项三',
                value: '3'
              },
              {
                label: '选项四',
                value: '4'
              }
            ]
          }
        ]
      }
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectHolder: '请选择',
      resultData: this.listData,
      // 下拉候选
      value: '',
      attackTypeOptions: [], // 攻击方式
      attackChainOptions: [], // 杀伤链
      levelOptions: [] // 风险等级
    }
  },
  watch: {
    resultData: {
      handler: function () {
        this.$emit('change', this.resultData)
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.el-input__inner-style {
  border: none;
  border-bottom: 1px solid rgba(196, 199, 202, 0.6);
  border-radius: unset;
  padding: 0;
  margin: 10px 0px;
  height: 20px;
  &:focus {
    box-shadow: none;
  }
}

.custom-list {
  padding: 10px;
  li {
    label {
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #63758f;
      padding-right: 20px;
    }
    .el-select ::v-deep {
      width: calc(100% - 74px);
      .el-input__inner {
        @extend .el-input__inner-style;
      }
    }
    .el-input ::v-deep {
      width: calc(100% - 74px);
      .el-input__inner {
        @extend .el-input__inner-style;
      }
    }
  }
}
</style>
