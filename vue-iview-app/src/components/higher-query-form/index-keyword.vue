<template>
  <div class="query-form">
    <!-- 默认搜索 -->
    <div class="sample">
      <el-button slot="append" type="primary" icon="icon-search" @click="handleRefresh" />
      <el-input
        v-model="keyword"
        :placeholder="placeholder"
        @focus="placeholder = ''"
        @blur="placeholder = '按关键字搜索'"
        @keyup.enter.native="handleRefresh"
      >
      </el-input>
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
      handler(newName, oldName) {
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
      this.$emit('click-search', { keyword: this.keyword })
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
