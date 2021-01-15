<template>
  <div class="query-form" :style="{ border: '1px solid #e2e5ee' }">
    <!-- 默认搜索 -->
    <div v-show="!isHigher" class="sample">
      <el-input
        v-model="keyword"
        size="small"
        :placeholder="placeholder"
        @focus="placeholder = ''"
        @blur="placeholder = '按关键字搜索'"
        @keyup.enter.native="handleRefresh"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleRefresh" />
        <i
          slot="append"
          class="el-input__icon el-icon-arrow-down"
          @click="isHigher = !isHigher"
        ></i>
      </el-input>
    </div>
    <!-- 高级搜索 -->
    <div
      v-show="isHigher"
      class="higher"
      :class="queryForm.length > 1 ? 'multiple-label' : ''"
      :style="{ height: 'auto', overflow: 'hidden', '--itemLabelWidth': labelWidth }"
    >
      <template v-for="(item, index) in queryForm">
        <header :key="index">{{ item.label }}</header>
        <slot v-if="item.slot" :name="item.slot" />
        <ul v-else :key="`item${index}`">
          <template v-for="(childItem, childIndex) in item.value">
            <li
              :key="`childItem${childIndex}`"
              :style="{
                float: childItem.clear ? 'none' : '',
                clear: childItem.clear ? 'both' : '',
                height: 'auto',
              }"
            >
              <slot v-if="childItem.slot" :name="childItem.slot" />
              <template v-else>
                <label>{{ childItem.label }}：</label>
                <!-- 单个输入框 -->
                <template v-if="childItem.type === 'input' && !childItem.inline">
                  <el-input
                    v-model="childItem.value"
                    size="mini"
                    :placeholder="`请输入${childItem.label}`"
                    clearable
                  />
                </template>
                <!-- 时间选择 -->
                <template v-else-if="childItem.type === 'date'">
                  <el-date-picker
                    v-model="childItem.value"
                    size="mini"
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
                    :multiple-limit="5"
                    size="mini"
                    filterable
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
                    size="mini"
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
              </template>
            </li>
            <li
              v-if="childItem.clear"
              :key="`childItem${childIndex}-temp`"
              style="display: none"
            ></li>
          </template>
        </ul>
      </template>
      <ul>
        <ol @click="handleRefresh">
          搜索
        </ol>
        <ol @click="handleRsetForm">
          重置
        </ol>
        <ol>
          <i
            slot="append"
            class="el-input__icon el-icon-arrow-up"
            @click="isHigher = !isHigher"
          ></i>
        </ol>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    isHigherQuery: {
      type: Boolean,
      defautl: false
    },
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
      isHigher: this.isHigherQuery,
      dateTime: [],
      queryForm: [],
      form: {}
    }
  },
  computed: {
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
        console.log('变更传入配置：', this.queryForm)
      },
      immediate: true,
      deep: true
    }
  },
  created() {
  },
  mounted() {
    this.handleRefresh()
  },
  methods: {
    // 搜索
    handleRefresh() {
      this.form = {}
      // 高级搜索
      if (this.isHigher) {
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
      // console.log(JSON.stringify(this.options))
      // 针对赋值的常规查询选项进行重置
      this.options[0].value.map((v) => {
        delete v.default
      })
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
              ele.value = (ele.multiple ? ele.default || [] : ele.default || '')
            } else if (['cascader', 'date'].includes(ele.type)) {
              ele.value = []
            }
            // 针对关键字搜索的特殊处理
            if (ele.name === 'keyword') {
              this.keyword = ele.default || ''
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
          if (ele.name === 'dateTime' && ele.value.length === 2) {
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
.input-style {
  width: calc(100% - var(--itemLabelWidth));
  .el-input {
    width: 100%;
    border-radius: 3px;
    font-size: 12px;
    input {
      border-radius: 3px;
      font-size: 12px;
    }
  }
}
.query-form {
  .sample {
    width: 100%;
    height: 32px;
    text-align: end;
    ::v-deep .el-input {
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
      .el-input-group__append {
        border: none;
        border-radius: unset;
        color: #fff;
        background-color: #44b6ae;
        border-color: #44b6ae;
        font-size: 20px;
        padding: 0 4px;
      }
    }
  }
  .higher {
    position: relative;
    > ul {
      width: 100%;
      clear: both;
      font-size: 12px;
      li {
        width: 50%;
        float: left;
        list-style-type: none;
        label {
          width: var(--itemLabelWidth);
          display: block;
          float: left;
          line-height: 32px;
        }
        /* 输入框 */
        & > .el-input ::v-deep {
          @extend .input-style;
        }
        /* 时间选择器 */
        .el-date-editor ::v-deep {
          @extend .input-style;
        }
        /* 三级联动 */
        .el-cascader ::v-deep {
          @extend .input-style;
        }
        /* 下拉多选 */
        .el-select ::v-deep {
          @extend .input-style;
        }
        &:nth-child(odd) {
          padding: 0 30px 0 0;
        }
        &:nth-child(even) {
          padding: 0 0 0 30px;
        }
      }
    }
    > ul:last-child {
      width: 100%;
      margin-top: 10px;
      margin-left: calc(100% - 145px);
      padding: 0px;
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
          i {
            width: 23px;
            line-height: 25px;
            font-size: 14px;
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
      margin-top: 10px;
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
    > ul {
      padding-left: 10px;
    }
    // ul {
    //   li {
    //     position: relative;
    //     // /* 输入框 */
    //     // & > .el-input {
    //     //   width: calc(100% - var(--itemLabelWidth) - 60px);
    //     // }
    //     // /* 时间选择器 */
    //     // .el-date-editor {
    //     //   width: calc(100% - var(--itemLabelWidth));
    //     // }
    //     // /* 三级联动 */
    //     // .el-cascader {
    //     //   width: calc(100% - var(--itemLabelWidth));
    //     // }
    //     // /* 下拉多选 */
    //     // .el-select {
    //     //   width: calc(100% - var(--itemLabelWidth) - 60px);
    //     // }
    //     & > span:last-child {
    //       position: absolute;
    //       height: 32px;
    //       line-height: 32px;
    //       color: #c6d1da;
    //       cursor: pointer;
    //       &:hover {
    //         color: #44b6ae;
    //       }
    //     }
    //     &:nth-child(odd) {
    //       padding: 0 20px 0 10px;
    //       & > span:last-child {
    //         right: 14px;
    //       }
    //     }
    //     &:nth-child(even) {
    //       /* padding-left: 50px; */
    //       padding: 0 10px 0 20px;
    //       & > span:last-child {
    //         right: 4px;
    //       }
    //     }
    //   }
    // }
  }
}

/* 0516add 下拉多选的样式覆盖 */
.el-select ::v-deep {
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
