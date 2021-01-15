## TagCheckbox 标签选择器

倒计时插件是表示一个时间区间的倒计时，会分别表示出距离这段区间的开始时间和结束时间的剩余时分秒。

### 基础用法

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`。
```html
<template>
  <CstTagCheckbox
    ref="customTagcheckbox"
    v-model="value"
    :options="options"
  ></CstTagCheckbox>
</template>
<script>
export default {
  data() {
    return {
      value: ['标签1', '标签2'],
      options: [
        {
          value: 'tag1',
          label: '标签1'
        },
        {
          value: 'tag2',
          label: '标签2'
        },
        {
          value: 'tag3',
          label: '标签3'
        },
        {
          value: 'tag4',
          label: '标签4'
        },
        {
          value: 'tag5',
          label: '标签5'
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
