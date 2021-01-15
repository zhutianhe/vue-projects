<template>
  <div class="select-input">
    <p class="select-input-item" v-for="(item, index) in selectInputData" :key="index">
      <el-select
        v-model="item.key"
        size="mini"
        filterable
        default-first-option
        placeholder="请选择查询条件"
        clearable
        @change="handleChangeSelect(item, index)"
      >
        <el-option
          v-for="(optionItem, optionIndex) in options"
          :key="`option${optionIndex}`"
          :label="optionItem.label"
          :value="optionItem.value"
        />
      </el-select>
      <el-input
        v-if="item.type === 'input'"
        v-model="item.value"
        size="mini"
        placeholder="请输入关键字"
        class="input-inline"
        clearable
      />
      <el-select
        v-if="item.type === 'select'"
        v-model="item.value"
        size="mini"
        placeholder="请选择查询条件"
        clearable
      >
        <el-option
          v-for="(v, i) in item.options"
          :key="`option${i}`"
          :label="v.label"
          :value="v.value"
        />
      </el-select>
      <i class="el-icon-plus" @click="handleAddRow()"></i>
      <i
        class="el-icon-delete"
        :style="{ cursor: selectInputData.length === 1 ? 'not-allowed' : 'pointer' }"
        @click="handleDeleteRow(index)"
      ></i>
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: Array,
      default: () => [{ key: '', value: '', type: 'input' }]
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectInputData: this.value.length > 0 ? this.value : [{ key: '', value: '', type: 'input' }]
    }
  },
  computed: {
  },
  watch: {
    selectInputData: {
      handler(newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  },
  created() {
    // 根据默认值渲染下拉选项和默认选中的值, 必须在created时触发
    this.selectInputData.map((v) => {
      this.options.map((item) => {
        if (item.value === v.key) {
          v.type = item.type
          v.options = item.children
        }
      })
    })
  },
  mounted() {

  },
  methods: {
    // 下拉选择后的级联事件
    handleChangeSelect(item, index) {
      this.options.map((v,) => {
        if (v.value === item.key) {
          this.selectInputData[index].type = v.type
          this.selectInputData[index].options = v.children
        }
      })
      console.log(item, index, this.selectInputData[index])
    },

    // 删除行
    handleDeleteRow(index) {
      if (this.selectInputData.length === 1) {
        return
      }
      this.selectInputData.splice(index, 1)
    },

    // 添加行
    handleAddRow() {
      // 生成新的一行
      this.selectInputData.push({ key: '', value: '', type: 'input' })
    },

    // 重置
    handleSelectReset() {
      this.selectInputData = [{ key: '', value: '', type: 'input' }]
    }
  }
}
</script>

<style lang="scss" scoped>
.select-input {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .select-input-item {
    position: relative;
    padding: 4px 0px 0px;
    height: 28px;
    margin-left: 160px;
    ::v-deep .el-select {
      height: 100%;
      .el-input {
        width: 100%;
        height: 100%;
        margin: 0;
        input {
          height: 100%;
          font-size: 12px;
        }
      }
      &:first-child {
        width: calc(50% - 160px);
        height: 100%;
        float: left;
      }
      &:nth-child(2) {
        width: calc(50% + 85px);
        height: 100%;
        margin-left: 5px;
      }
    }
    ::v-deep .el-input {
      width: calc(50% + 85px);
      height: 100%;
      margin-left: 5px;
      input {
        height: 100%;
        color: #8c9bb0;
        font-size: 12px;
      }
    }
  }
}
</style>
