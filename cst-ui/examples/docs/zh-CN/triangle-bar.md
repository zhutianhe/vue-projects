## TriangleBar 三角柱状图

倒计时插件是表示一个时间区间的倒计时，会分别表示出距离这段区间的开始时间和结束时间的剩余时分秒。

### 三角形纵向柱状图

:::demo 定义series。
```html
<template>
  <CstTriangleBar
    id="cstTriangleBar1"
    :options="options"
  ></CstTriangleBar>
</template>
<script>
export default {
  data() {
    return {
      options: {
        xAxis: [
          {
            type: 'category',
            data: ['2012', '2013', '2014', '2015', '2016', '2017']
          }
        ],
        series: [
          {
            name: '数量',
            type: 'triangle',
            data: [50000, 30000, 30000, 20000, 40000, 60000]
          }
        ]
      }
    }
  }
}
</script>
```
:::

### 三角形叠加纵向柱状图

:::demo 定义series。
```html
<template>
  <CstTriangleBar
    id="cstTriangleBar2"
    :options="options"
  ></CstTriangleBar>
</template>
<script>
export default {
  data() {
    return {
      options: {
        xAxis: [
          {
            type: 'category',
            data: ['2012', '2013', '2014', '2015', '2016', '2017']
          }
        ],
        series: [
          {
            name: '数量',
            type: 'triangle',
            data: [50000, 30000, 30000, 20000, 40000, 60000]
          },
          {
            name: '数量',
            type: 'triangle',
            data: [50000, 30000, 30000, 20000, 40000, 60000]
          },
          {
            name: '数量',
            type: 'triangle',
            data: [50000, 30000, 30000, 20000, 40000, 60000]
          }
        ]
      }
    }
  }
}
</script>
```
:::

### 外拱形纵向柱状图

:::demo 定义series。
```html
<template>
  <CstTriangleBar
    id="cstTriangleBar3"
    :options="options"
  ></CstTriangleBar>
</template>
<script>
export default {
  data() {
    return {
      options: {
        xAxis: [
          {
            type: 'category',
            data: ['2012', '2013', '2014', '2015', '2016', '2017']
          }
        ],
        series: [
          {
            name: '数量',
            type: 'outer-triangle',
            data: [50000, 30000, 30000, 20000, 40000, 60000]
          }
        ]
      }
    }
  }
}
</script>
```
:::

### 内拱形纵向柱状图

:::demo 定义series。
```html
<template>
  <CstTriangleBar
    id="cstTriangleBar4"
    :options="options"
  ></CstTriangleBar>
</template>
<script>
export default {
  data() {
    return {
      options: {
        xAxis: [
          {
            type: 'category',
            data: ['2012', '2013', '2014', '2015', '2016', '2017']
          }
        ],
        series: [
          {
            name: '数量',
            type: 'inner-triangle',
            data: [50000, 30000, 30000, 20000, 40000, 60000]
          }
        ]
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
