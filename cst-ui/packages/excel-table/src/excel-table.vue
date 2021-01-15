<template>
  <div
    v-if="loading"
    class="excel-table"
    :style="{ '--tableColumns': tableColumnsRate, '--tableRows': tableRowsRate }"
  >
    <!-- header -->
    <template v-for="(item, index) in tableColumns">
      <div :key="`${index}`" class="excel-table-header">{{ item.label }}</div>
    </template>
    <!-- body -->
    <template v-for="(item, index) in data">
      <template v-for="(v, i) in tableColumns">
        <div
          v-if="!v.slot && cellIndexs[index][i] > 0"
          :key="`cell-${index}-${i}`"
          class="excel-table-cell"
          :class="i % 2 === 0 ? 'even-cell-style' : 'odd-cell-style'"
          :style="{
            width: tableColumns[i].width || 'auto',
            gridRowStart: index + 2,
            gridRowEnd: index + 2 + cellIndexs[index][i],
          }"
        >
          {{ item[tableColumns[i].prop] }}
        </div>
        <div
          v-if="v.slot"
          :key="`cell-${index}-${i}`"
          class="excel-table-cell"
          :class="i % 2 === 0 ? 'even-cell-style' : 'odd-cell-style'"
          :style="{
            width: tableColumns[i].width || 'auto',
          }"
        >
          <slot :name="tableColumns[i].prop" :row="item" :index="index"></slot>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CstExcelTable',
  components: {},
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      // 是否渲染
      loading: false,

      // 默认显示列名
      // defaultColumns: [
      //   { prop: 'range', label: '督办范围', width: 'auto' },
      //   { prop: 'content', label: '工作内容', width: 'auto' },
      //   { prop: 'requirement', label: '工作要求', width: 'auto' },
      //   { prop: 'submission', label: '提交物要求', width: 'auto' },
      //   { prop: 'remark', label: '备注', width: 'auto' }
      // ],

      // 列表列占比
      tableColumnsRate: '',

      // 列表行占比
      tableRowsRate: '',

      //
      keyword: ''
    }
  },
  computed: {
    // 初始化表单数据
    tableData() {
      return this.data.map((v) => {
        return { range: v.range, content: v.content, requirement: v.requirement, submission: v.submission, remark: v.remark }
      })
    },
    // 初始化表单列
    tableColumns() {
      // console.log([...this.defaultColumns, ...this.columns])
      return [...this.columns]
    },

    // 计算每个单元格的合并占比
    cellIndexs() {
      const arrays = Array(this.data.length).fill(1).map(() => {
        return Array(5).fill(1)
      })
      for (let i = this.tableData.length - 1; i >= 0; i--) {
        let j = 0
        for (const key in this.tableData[i]) {
          // 如果当前行的内容与上一行相同，当前为0，上一行+1， 否则当前为1
          if (i > 0 && this.data[i][key] === this.data[i - 1][key]) {
            arrays[i - 1][j] = arrays[i][j] + 1
            arrays[i][j] = 0
          }
          if (j === 5) break
          j++
        }
      }
      return arrays
    }
  },
  watch: {
    tableColumns: {
      handler() {
        this.tableColumnsRate = `repeat(${this.tableColumns.length}, auto)`
        this.loading = true
      },
      immediate: true
    },

    tableRowsRate() {
      return '30px auto'
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    // 获取每个单元格的起始标线
    getGridRowStartIndex(row) {
      return row + 2
    },

    // 获取每个单元格的终止标线
    getGridRowEndIndex(row, col) {
      console.log(this.arrays[row][col])
      return row + 3
    }
  }
}
</script>

<style lang="scss" scoped>
.excel-table {
  display: grid;
  grid-template-columns: var(--tableColumns);
  grid-template-rows: var(--tableRows);
  &-header {
    font-family: PingFangSC-Semibold;
    font-size: 13px;
    color: #4c5d77;
    background: #f4f4f6;
    border: 1px solid #f4f4f6;
    max-height: 40px;
    text-align: left;
    padding: 4px 7px;
    margin-left: -1px;
  }
  &-cell {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    position: relative;
    color: #63758f;
    border: 1px solid #e8ecef;
    margin-left: -1px;
    margin-top: -1px;
    min-height: 30px;
    text-align: left;
    padding: 0px 7px;
    line-height: 20px;

    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
    -webkit-box-align: center;

    display: -moz-box;
    -moz-box-orient: horizontal;
    -moz-box-pack: center;
    -moz-box-align: center;

    display: -o-box;
    -o-box-orient: horizontal;
    -o-box-pack: center;
    -o-box-align: center;

    display: -ms-box;
    -ms-box-orient: horizontal;
    -ms-box-pack: center;
    -ms-box-align: center;

    // display: box;
    // box-orient: horizontal;
    // box-pack: center;
    // box-align: center;
  }
  .even-cell-style {
    background: rgba(230, 237, 245, 0.3);
  }
  .odd-cell-style {
    background: #ffffff;
  }

  // icon 图标组
  .icon-button-group {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    line-height: 100%;
  }
}
</style>
