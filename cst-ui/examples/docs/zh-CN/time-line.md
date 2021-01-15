## TimeLine 时间轴列表

倒计时插件是表示一个时间区间的倒计时，会分别表示出距离这段区间的开始时间和结束时间的剩余时分秒。

### 基础用法

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`。
```html
<template>
  <CstTimeLine :result="result"></CstTimeLine>
</template>
<script>
export default {
  data() {
    return {
      result: {
        data: [{
          startTime: "2020/05/21 19:15:26",
        }, {
          startTime: "2020/05/21 19:15:26",
        }, {
          startTime: "2020/05/21 19:15:24",
        }, {
          startTime: "2020/05/21 19:15:23",
        }, {
          startTime: "2020/05/21 19:15:23",
        }, {
          startTime: "2020/05/21 19:15:22",
        }, {
          startTime: "2020/05/21 19:15:22",
        }, {
          startTime: "2020/05/21 19:15:19",
        }, {
          startTime: "2020/05/21 19:15:19",
        }, {
          startTime: "2020/05/21 19:15:19",
        }, {
          startTime: "2020/05/21 19:15:19",
        }, {
          startTime: "2020/05/21 19:15:18",
        }, {
          startTime: "2020/05/21 19:15:15",
        }, {
          startTime: "2020/05/21 19:15:15",
        }],
        total: 61,
        offset: 0,
        limit: 20
      }
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
