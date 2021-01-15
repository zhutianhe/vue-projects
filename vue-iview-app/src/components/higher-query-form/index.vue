<template>
  <div class="query-form">
    <!-- 默认搜索 -->
    <div v-show="!isHigherQuery" class="sample">
      <el-button
        slot="append"
        type="primary"
        icon="icon-angle-down"
        @click="isHigherQuery = !isHigherQuery"
      />
      <el-input
        v-model="keyword"
        :placeholder="placeholder"
        @focus="placeholder = ''"
        @blur="placeholder = '按关键字搜索'"
        @keyup.enter.native="handleRefresh"
      >
        <i slot="suffix" class="el-input__icon el-icons icon-search" @click="handleRefresh" />
      </el-input>
    </div>
    <!-- 高级搜索 -->
    <div
      v-show="isHigherQuery"
      class="higher"
      :class="queryForm.length > 1 ? 'multiple-label' : ''"
      :style="{ height: `${contentHeight + 32}px`, '--itemLabelWidth': labelWidth }"
    >
      <template v-for="(item, index) in queryForm">
        <header :key="index">
          {{ item.label }}
        </header>
        <ul :key="`item${index}`">
          <li v-for="(childItem, childIndex) in item.value" :key="`childItem${childIndex}`">
            <label>{{ childItem.label }}：</label>
            <!-- 单个输入框 -->
            <template v-if="childItem.type === 'input' && !childItem.inline">
              <el-input
                v-model="childItem.value"
                :placeholder="`请输入${childItem.label}`"
                clearable
              />
            </template>
            <!-- 多个输入框 -->
            <template v-else-if="childItem.type === 'input' && childItem.inline">
              <el-input
                v-model="inputItem.value"
                v-for="inputItem in childItem.value"
                :key="inputItem.name"
                class="input-inline"
                :placeholder="`请输入${inputItem.label}`"
                clearable
              />
            </template>
            <!-- 时间选择 -->
            <template v-else-if="childItem.type === 'date'">
              <el-date-picker
                v-model="childItem.value"
                class="chart-date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                align="right"
                clearable
              />
            </template>
            <!-- 下拉选择 -->
            <template v-else-if="childItem.type === 'select'">
              <el-select
                v-model="childItem.value"
                :multiple="childItem.multiple"
                :multiple-limit="4"
                filterable
                allow-create
                default-first-option
                placeholder="全部"
                clearable
              >
                <el-option
                  v-for="(optionItem, optionIndex) in childItem.options"
                  :key="`option${optionIndex}`"
                  :label="optionItem.label"
                  :value="optionItem.value"
                />
              </el-select>
            </template>
            <!-- 级联选择 -->
            <template v-else-if="childItem.type === 'cascader'">
              <el-cascader
                v-model="childItem.value"
                :placeholder="`请选择${childItem.label}`"
                :options="childItem.options"
                :change-on-select="true"
                :props="childItem.props"
                clearable
              />
            </template>
            <span
              v-if="childItem.inverse"
              :style="{ color: childItem.inverseClicked ? '#44B6AE' : '' }"
              @click="handleInverseClick(childItem)"
            >
              NO
            </span>
          </li>
        </ul>
      </template>
      <ul :style="{ top: `${contentHeight + 16}px` }">
        <ol @click="handleRefresh">
          搜索
        </ol>
        <ol @click="handleRsetForm">
          重置
        </ol>
        <ol>
          <el-button slot="append" icon="icon-angle-up" @click="isHigherQuery = !isHigherQuery" />
        </ol>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    // 搜索框默认占位
    searchPlaceholder: {
      type: String,
      default: '按关键字搜索'
    },
    // 高级搜索输入选项
    options: {
      type: [Object, Array],
      default: () => {
        return []
      }
    },
    // 标题宽度
    labelWidth: {
      type: String,
      default: () => {
        return '130px'
      }
    }
  },
  data() {
    return {
      placeholder: this.searchPlaceholder,
      keyword: null,
      isHigherQuery: false,
      dateTime: [],
      queryForm: [],
      form: {}
    }
  },
  computed: {
    // 搜索内容的高度
    contentHeight() {
      let height = 0
      this.options.map((v) => {
        // 标题的高度
        height += (v.label ? 18 : 0)
        // 内容的高度
        if (v.value.length) {
          height += (Number((v.value.length / 2).toFixed()) * 32)
        }
      })
      return height
    }
  },
  watch: {
    options: {
      handler() {
        this.queryForm = []
        const _options = JSON.parse(JSON.stringify(this.options))
        if (Array.isArray(_options)) {
          this.handleFormInit(_options)
        }
        this.queryForm = JSON.parse(JSON.stringify(_options))
        // console.log('变更传入配置：', this.queryForm)
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    // const _options = JSON.parse(JSON.stringify(this.options))
    // if (Array.isArray(_options)) {
    //   this.handleFormInit(_options)
    // }
    // this.queryForm = JSON.parse(JSON.stringify(_options))
    // console.log('传入配置：', this.queryForm)
  },
  mounted() {
  },
  methods: {
    // 搜索
    handleRefresh() {
      this.form = {}
      // 高级搜索
      if (this.isHigherQuery) {
        this.handleFormSerialize(this.queryForm)
        this.$emit('click-search', this.form)
      } else {
        this.$emit('click-search', { keyword: this.keyword })
      }
      console.log('输出表单', this.form)
    },

    // 重置
    handleRsetForm() {
      this.queryForm = []
      const _options = JSON.parse(JSON.stringify(this.options))
      if (Array.isArray(_options)) {
        this.handleFormInit(_options)
      }
      this.queryForm = JSON.parse(JSON.stringify(_options))
      this.$emit('click-reset')
    },

    // 反选
    handleInverseClick(ele) {
      ele.inverseClicked = !ele.inverseClicked
      console.log(this.queryForm)
      // 如果为对象数组，则修改每个对象的name
      if (Array.isArray(ele.value) && typeof (ele.value[0]) === 'object') {
        ele.value = ele.value.map((v) => {
          v.name = v.name.endsWith('Exclude') ? v.name.substr(0, v.name.indexOf('Exclude')) : `${v.name}Exclude`
          return { ...v }
        })
        // 如果为对象，则修改该对象的name
      } else {
        ele.name = ele.name.endsWith('Exclude') ? ele.name.substr(0, ele.name.indexOf('Exclude')) : `${ele.name}Exclude`
      }
    },

    // 表单初始化
    handleFormInit(arr) {
      arr.forEach((ele) => {
        if (Array.isArray(ele.value) && typeof (ele.value[0]) === 'object') {
          // 多个行内元素处理
          if (ele.inline && ele.value.length) {
            ele.value = ele.value.map((v) => {
              return { ...v, type: ele.type }
            })
          }
          this.handleFormInit(ele.value)
        } else {
          if (ele.value && typeof (ele.value) === 'string') {
            ele.name = ele.value
            if (['input', 'select'].includes(ele.type)) {
              ele.value = (ele.multiple ? [] : '')
            } else if (['cascader', 'date'].includes(ele.type)) {
              ele.value = ele.default || []
            }
          }
        }
        // 如果为可反选字段，添加是否click字段
        if (ele.inverse) {
          ele.inverseClicked = false
        }
      })
    },

    // 表单序列化
    handleFormSerialize(arr) {
      arr.forEach((ele) => {
        // 如果ele.value是对象数组
        if (Array.isArray(ele.value) && typeof (ele.value[0]) === 'object') {
          this.handleFormSerialize(ele.value)
        } else {
          console.log(ele.value)
          if (ele.name === 'dateTime' && ele.value && ele.value.length === 2) {
            this.form.startTime = ele.value[0]
            this.form.endTime = ele.value[1]
          } else {
            ele.value && (this.form[ele.name] = ele.value)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.query-form {
  .sample {
    width: 100%;
    height: 32px;
    text-align: end;
    .el-input {
      width: 200px;
      float: right;
      .el-input__inner {
        border-radius: unset;
        border: none;
        &:focus {
          box-shadow: none;
        }
      }
      &:hover {
        .el-input__inner {
          background-color: #72cbc4;
          &::-webkit-input-placeholder {
            color: white;
          }
        }
        i {
          color: white;
        }
      }
    }
    .el-button {
      float: right;
      border-radius: unset;
    }
  }
  .higher {
    position: relative;
    height: 128px;
    margin: 20px 0px;
    ul {
      width: 100%;
      clear: both;
      font-size: 12px;
      li {
        width: 50%;
        float: left;
        height: 32px;
        label {
          width: var(--itemLabelWidth);
          display: block;
          float: left;
          line-height: 32px;
        }
        /* 输入框 */
        & > .el-input {
          width: calc(100% - var(--itemLabelWidth));
          height: 32px;
          padding: 4px 0px;
          input {
            height: 25px !important;
            border-radius: 3px;
            font-size: 12px;
          }
        }
        /* 时间选择器 */
        .el-date-editor ::v-deep {
          width: calc(100% - var(--itemLabelWidth));
          height: 25px;
          padding: 0 10px;
          margin: 4px 0px;
          input,
          span {
            font-size: 12px;
          }
          .el-range-input {
            position: relative;
            top: -1px;
          }
        }
        /* 三级联动 */
        .el-cascader {
          width: calc(100% - var(--itemLabelWidth));
          .el-input {
            width: 100%;
            height: 25px !important;
            border-radius: 3px;
            font-size: 12px;
            input {
              height: 25px !important;
              border-radius: 3px;
              font-size: 12px;
            }
            .el-input__suffix {
              .el-input__suffix-inner {
                i {
                  line-height: 17px;
                }
              }
            }
          }
          .el-cascader__label {
            font-size: 12px;
          }
        }
        /* 下拉多选 */
        .el-select {
          width: calc(100% - var(--itemLabelWidth));
          height: 32px;
          padding: 4px 0px;
          .el-input {
            width: 100%;
            height: 25px;
            border-radius: 3px;
            font-size: 12px;
            input {
              height: 25px !important;
              border-radius: 3px;
              font-size: 12px;
            }
          }
          /* 多选之后的显示样式 */
          .el-tag {
            height: 20px;
            line-height: 18px;
            i {
              top: -5px;
            }
          }
        }
        /* 一行多input  */
        .input-inline {
          // 总宽度的一半 - margin的一半 - label宽度的一半
          width: calc(50% - 10.5px - var(--itemLabelWidth) / 2);
          &:nth-child(2) {
            // 伪类元素pandding-left * 2 + 1
            margin-right: 21px;
            &::after {
              content: ":";
              padding: 0 0 0 10px;
              float: left;
              position: absolute;
            }
          }
        }
        &:nth-child(odd) {
          padding-right: 50px;
        }
        &:nth-child(even) {
          padding-left: 50px;
        }
      }
    }
    ul:last-child {
      width: 145px;
      position: absolute;
      top: 100px;
      right: 0px;
      ol {
        width: 60px;
        height: 25px;
        float: left;
        text-align: center;
        line-height: 23px;
        cursor: pointer;
        &:first-child {
          background: #44b6af;
          color: #ffffff;
          border-radius: 2px 0 0 2px;
          border: 1px solid #44b6af;
        }
        &:nth-child(2) {
          color: #44b6af;
          border-top: 1px solid #44b6af;
          border-bottom: 1px solid #44b6af;
        }
        &:last-child {
          width: 25px;
          border-radius: 0 2px 2px 0;
          border: 1px solid #44b6af;
          .el-button {
            width: 23px;
            height: 23px;
            border: none;
          }
        }
      }
    }
  }
  .multiple-label {
    header {
      width: 100%;
      display: inline-block;
      position: relative;
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: #44b6ae;
      letter-spacing: 0;
      padding-left: 8px;
      &::before {
        content: "";
        width: 2px;
        height: 12px;
        display: block;
        position: absolute;
        background: #44b6ae;
        left: 0px;
        top: 3px;
      }
    }
    ul {
      li {
        position: relative;
        label {
          width: 150px;
        }
        /* 输入框 */
        & > .el-input {
          width: calc(100% - var(--itemLabelWidth));
        }
        /* 时间选择器 */
        .el-date-editor {
          width: calc(100% - var(--itemLabelWidth));
        }
        /* 三级联动 */
        .el-cascader {
          width: calc(100% - var(--itemLabelWidth));
        }
        /* 下拉多选 */
        .el-select {
          width: calc(100% - var(--itemLabelWidth));
        }
        /* 一行多input  */
        & > .input-inline {
          &:nth-child(2) {
            width: calc(50% - 75px);
            margin: 0px;
            input {
              border-radius: 3px 0px 0px 3px;
            }
          }
          &:nth-child(3) {
            width: calc(50% - 74px);
            margin: -1px;
            &.el-input__inner {
              border-radius: 0px 3px 3px 0px;
            }
          }
        }
        & > span:last-child {
          position: absolute;
          height: 32px;
          line-height: 32px;
          color: #c6d1da;
          cursor: pointer;
          &:hover {
            color: #44b6ae;
          }
        }
        &:nth-child(odd) {
          padding: 0 40px 0 10px;
          & > span:last-child {
            right: 14px;
          }
        }
        &:nth-child(even) {
          /* padding-left: 50px; */
          padding: 0 30px 0 20px;
          & > span:last-child {
            right: 4px;
          }
        }
      }
    }
  }
}

/* 0516add 下拉多选的样式覆盖 */
.el-select {
  .el-tag {
    border-color: #46caad !important;
    color: #46caad;
    background-color: rgba(70, 202, 173, 0.2) !important;
    padding: 0 5px;
    .el-tag__close.icon-close {
      color: #46caad !important;
      background-color: transparent !important;
    }
  }
}
</style>
