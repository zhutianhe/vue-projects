<!-- 高级搜索组件默认内置四种表单组件，在配置项中通过type参数进行设置，如下：

- `input`类型，显示内置的输入框，
- `select`类型，显示内置的下拉框，默认单选，可以通过`multiple`属性配置是否多选
- `date`类型，显示内置的时间区间组件，默认为`yyyy-MM-DD HH:mm:ss`
- `cascader`类型，显示内置的级联下拉组件 -->

```html
<CustomSearch
  ref="higherQueryForm"
  label-width="150px"
  :options="options"
  :isHigherQuery="isHigherQuery"
  @click-search="handleRefresh"
  @click-reset="handleRsetForm"
>
</CustomSearch>

<script>
export default {
  data() {
    return {
      isHigherQuery: false, // 默认展示简单搜索
      options: [
        {
          label: '',
          value: [
            {
              label: '输入框',
              value: 'inputValue',
              alias: 'inputAlias',
              type: 'input'
            },
            {
              label: '选择器',
              value: 'selectValue',
              alias: 'selectAlias',
              type: 'select',
              options: [
                {
                  label: '选项一',
                  value: '1'
                },
                {
                  label: '选项二',
                  value: '2'
                }
              ]
            },
            {
              label: '选择器(可多选)',
              value: 'multipleValue',
              alias: 'multipleAlias',
              multiple: true,
              type: 'select',
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
                },
                {
                  label: '选项五',
                  value: '5'
                }
              ]
            },
            {
              label: '时间选择',
              value: 'dateValue',
              alias: 'dateAlias',
              type: 'date'
            },
            {
              label: '级联选择',
              value: 'cascaderValue',
              alias: 'cascaderAlias',
              type: 'cascader'
            }]
        }
      ],
    }
  },
  methods: {
    // 搜索
    handleRefresh(params) {
      console.log('start search', params)
    },

    // 重置
    handleRsetForm() {
      this.$emit('click-reset', {})
    }
  }
}
</script>
```