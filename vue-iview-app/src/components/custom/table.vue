<template>
  <div class="custom-table">
    <header class="custom-table-item header">
      <div class="cell">规则编号</div>
      <div class="cell">字段名称</div>
      <div class="cell">运算方法</div>
      <div class="cell">匹配条件</div>
    </header>
    <section class="custom-table-list">
      <template v-if="rowDatas.length > 0">
        <div v-for="(row, index) in rowDatas" :key="index" class="custom-table-item">
          <div class="cell">
            <el-input v-model="row.code" :placeholder="inputHolder" :readonly="readonly"></el-input>
          </div>
          <div class="cell">
            <el-input v-if="readonly" :readonly="readonly" :value="row.fieldName"></el-input>
            <el-select
              v-model="row.field"
              v-else
              :placeholder="selectHolder"
              @change="handleChangeField(row, index)"
            >
              <el-option
                v-for="item in ruleFieldOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="cell">
            <el-input v-if="readonly" :readonly="readonly" :value="row.fieldName"></el-input>
            <el-select v-model="row.method" v-else :placeholder="selectHolder">
              <el-option
                v-for="item in methodOptions[index]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="cell">
            <el-input
              v-model="row.condition"
              :placeholder="inputHolder"
              :readonly="readonly"
            ></el-input>
          </div>
          <img
            v-if="index === rowDatas.length - 1"
            v-show="!readonly"
            src="@/assets/svg/add.svg"
            @click="handleAddRow()"
          />
          <img
            v-else
            v-show="!readonly"
            src="@/assets/svg/delete.svg"
            @click="handleDeleteRow(index)"
          />
        </div>
      </template>
    </section>
  </div>
</template>

<script>
// api
import { getOptionsList } from '@/api/analysis/common/index'

export default {
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    sourceId: {
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
      inputHolder: '请输入',
      selectHolder: '请选择',
      ruleFieldOptions: [], // 数据源-字段名称
      methodOptions: [], // 字段名称-运算方法
      // rowDatas: this.tableData,
      rowData: {
        code: '',
        field: '',
        method: '',
        condition: ''
      }
    }
  },
  computed: {
    source() {
      console.log('computed', this.sourceId)
      return this.sourceId
    },
    rowDatas: {
      get() {
        return this.tableData
      },
      set(val) {
        return val
      }
    }
  },
  watch: {
    // 数据源级联字段
    source(newValue, oldValue) {
      console.log('source watch', newValue)
      if (newValue) {
        this.getRuleFieldOptions().then((res) => {
          this.ruleFieldOptions = res
        })
      }
    },
    // 监听每行数据的变化
    rowDatas: {
      handler: function (newValue, oldValue) {
        console.log('watch', newValue)
        this.$emit('change', newValue)
      },
      deep: true
    }
  },
  mounted() {
    // 默认加载详情中的字段名称和运算方法
    if (this.source) {
      getOptionsList('ruleField', { source: this.source }).then((res) => {
        this.ruleFieldOptions = res.data
        // 如果计算规则有数据, 给每条数据匹配对应的下拉
        if (this.rowDatas.length > 1) {
          this.rowDatas.forEach((ele, index) => {
            for (const v of this.ruleFieldOptions) {
              if (ele.field === v.value) {
                getOptionsList('method', { label: v.label }).then((res) => {
                  this.methodOptions.splice(index, 1, res.data)
                })
              }
            }
          })
        }
      })
    }
  },
  methods: {
    // 获取数据源-级联字段名称
    getRuleFieldOptions() {
      if (this.source) {
        return getOptionsList('ruleField', { source: this.source }).then((res) => {
          return res.data
        })
      } else {
        return []
      }
    },

    // 获取字段名称-级联运算方法
    getMethodOptions(params) {
      if (this.source && params) {
        return getOptionsList('method', { label: params }).then((res) => {
          return res.data
        })
      } else {
        return []
      }
    },

    // 字段名称变化
    handleChangeField(row, index) {
      console.log(row, index)
      this.ruleFieldOptions.forEach((ele) => {
        if (ele.value === row.field) {
          this.getMethodOptions(ele.label).then((res) => {
            this.methodOptions.splice(index, 1, res)
          })
        }
      })
    },

    // 删除行
    handleDeleteRow(index) {
      this.rowDatas.splice(index, 1)
    },

    // 添加行
    handleAddRow() {
      // 生成新的一行
      this.rowData = {
        code: '',
        field: '',
        method: '',
        condition: ''
      }
      this.rowDatas.push(this.rowData)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-table {
  padding: 10px;
  .custom-table-list {
    height: 400px;
    box-sizing: border-box;
    padding-top: 10px;
    > div {
      position: relative;
      img {
        position: absolute;
        width: 20px;
        right: 4px;
        top: 6px;
        cursor: pointer;
      }
      &:last-child {
        img {
          position: absolute;
          width: 10px;
          right: 10px;
          top: 50%;
          margin-top: -10px;
        }
      }
    }
  }
  .custom-table-item {
    display: flex;
    font-size: 12px;
    color: rgba(133, 134, 134, 1);
    &.header {
      padding-top: 0;
      .cell {
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #63758f;
      }
    }
    .cell {
      width: 95px;
      padding-right: 10px;
      line-height: 15px;
      box-sizing: border-box;
      flex: none;
      word-break: break-all;
      overflow: hidden;
      text-overflow: inherit;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
      display: -webkit-box;
    }
    .cell-center {
      text-align: center !important;
      img {
        width: 40px;
      }
    }
  }
}

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

.el-input ::v-deep {
  .el-input__inner {
    @extend .el-input__inner-style;
  }
}

.el-select ::v-deep {
  .el-input__inner {
    @extend .el-input__inner-style;
  }
}
</style>
