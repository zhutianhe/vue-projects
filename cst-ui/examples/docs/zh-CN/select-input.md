## SelectInput 条件选择输入框

倒计时插件是表示一个时间区间的倒计时，会分别表示出距离这段区间的开始时间和结束时间的剩余时分秒。

### 基础用法

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`。
```html
<template>
  <CstSelectInput
    ref="selectInput"
    v-model="value"
    :options="selectInputOptions"
  ></CstSelectInput>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      selectInputOptions: [
        {
          label: '选项条件一',
          value: '1'
        },
        {
          label: '选项条件二',
          value: '2'
        },
        {
          label: '选项条件三',
          value: '3'
        },
        {
          label: '选项条件四',
          value: '4'
        },
        {
          label: '选项条件五',
          value: '5'
        }
      ]
    }
  }
}
</script>
```
:::

### 多范围输入

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`。
```html
<template>
  <CstSelectInput
    ref="selectInput"
    v-model="value"
    :multiple="true"
    :options="selectInputOptions"
  ></CstSelectInput>
</template>
<script>
export default {
  data() {
    return {
      value: [],
      selectInputOptions: [
        {
          label: '选项条件一',
          value: '1'
        },
        {
          label: '选项条件二',
          value: '2'
        },
        {
          label: '选项条件三',
          value: '3'
        },
        {
          label: '选项条件四',
          value: '4'
        },
        {
          label: '选项条件五',
          value: '5'
        }
      ]
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
