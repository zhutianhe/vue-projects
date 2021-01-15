## TimeDown 倒计时

倒计时插件是表示一个时间区间的倒计时，会分别表示出距离这段区间的开始时间和结束时间的剩余时分秒。

### 基础用法

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`.
```html
<template>
  <CstTimedown v-model="timeRange"></CstTimedown>
</template>
<script>
export default {
  data() {
    return {
      timeRange: { startTime: new Date(), endTime: new Date().setDate(new Date().getDate() + 90) }
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
