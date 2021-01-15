## HigherSearch 高级搜索

倒计时插件是表示一个时间区间的倒计时，会分别表示出距离这段区间的开始时间和结束时间的剩余时分秒。

### 基础用法

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`。
```html
<template>
  <CstHigherSearch
    ref="higherQueryForm"
    label-width="150px"
    :options="options"
    :isHigherQuery="isHigherQuery"
    @click-search="handleRefresh"
    @click-reset="handleRsetForm"
  >
  </CstHigherSearch>
</template>
<script>
export default {
  data() {
    return {
      showQuery: false,
      isHigherQuery: false,
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
      this.queryForm = {}
      this.$refs.areaSrcPort.handleInputReset()
      this.$refs.areaDestPort.handleInputReset()
      this.$refs.areaSrcIp.handleInputReset()
      this.$refs.areaDestIp.handleInputReset()
      this.$refs.selectInput.handleSelectReset()
      this.$refs.aggregation.handleTagsReset()
      this.$emit('click-reset', {})
    }
  }
}
</script>
```
:::

### 多标题

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`。
```html
<template>
  <CstHigherSearch
    ref="higherQueryForm"
    label-width="100px"
    :options="multipleOptions"
    :isHigherQuery="isHigherQuery"
  >
  </CstHigherSearch>
</template>
<script>
export default {
  data() {
    return {
      showQuery: false,
      isHigherQuery: false,
      multipleOptions: [
        {
          label: '常规搜索',
          value: [
            {
              label: '输入框',
              value: 'inputValue',
              alias: 'inputAlias',
              type: 'input'
            },
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
          ]
        },
        {
          label: '自定义搜索',
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
          ]
        }
      ]
    }
  }
}
</script>
```
:::

### 插槽

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`。
```html
<template>
  <CstHigherSearch
    ref="higherQueryForm"
    label-width="150px"
    :options="slotOptions"
    :isHigherQuery="isHigherQuery"
  >
    <!-- 目的IP -->
    <template slot="areaDestIp">
      <label>目的IP：</label>
      <CstRangeInput
        ref="areaDestIp"
        v-model="rangeInputValue"
        placeholder="IP"
      ></CstRangeInput>
    </template>
    <!-- 自定义查询 -->
    <template slot="custom">
      <CstSelectInput
        ref="selectInput"
        v-model="selectInputValue"
        :options="selectInputOptions"
      ></CstSelectInput>
    </template>
  </CstHigherSearch>
</template>
<script>
export default {
  data() {
    return {
      showQuery: false,
      isHigherQuery: false,
      rangeInputValue: '',
      selectInputValue: [],
      selectInputOptions: [
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
      ],
      slotOptions: [
        {
          label: '常规搜索',
          value: [
            {
              label: '插槽输入框',
              slot: 'areaDestIp',
              height: '102px'
            }
          ]
        },
        {
          label: '自定义查询',
          slot: 'custom'
        },
      ],
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|  |  |  |  |  |
