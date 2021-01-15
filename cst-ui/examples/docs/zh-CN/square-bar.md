## SquareBar 方型柱状图

方型柱状图是在原echarts的柱状图的扩展，重新定义了图形。

### 方块纵向柱状图

:::demo 定义series。
```html
<template>
  <CstSquareBar
    id="cstSquareBar1"
    :options="options"
  ></CstSquareBar>
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
            type: 'square',
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

### 双方型纵向柱状图

:::demo 定义多个series，每个series中的子项type都是square。
```html
<template>
  <CstSquareBar
    id="cstSquareBar2"
    :options="options"
  ></CstSquareBar>
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
            type: 'square',
            data: [50000, 30000, 30000, 20000, 40000, 60000]
          },
          {
            name: '占比',
            type: 'square',
            data: [30, 30, 80, 40, 50, 40]
          },
          {
            name: '占比',
            type: 'square',
            data: [30, 30, 80, 40, 50, 40]
          },
          {
            name: '占比',
            type: 'square',
            data: [30, 30, 80, 40, 50, 40]
          }
        ]
      }
    }
  }
}
</script>
```
:::

### 圆形纵向柱状图

:::demo 只需要定义series中的type属性为circle.
```html
<template>
  <CstSquareBar
    id="cstSquareBar3"
    :options="options"
  ></CstSquareBar>
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
            type: 'cicle',
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

### 双圆形纵向柱状图

:::demo 定义多series。
```html
<template>
  <CstSquareBar
    id="cstSquareBar4"
    :options="options"
  ></CstSquareBar>
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
            type: 'cicle',
            data: [50000, 30000, 30000, 20000, 40000, 60000]
          },
          {
            name: '占比',
            type: 'cicle',
            data: [30, 30, 80, 40, 50, 40]
          },
          {
            name: '占比',
            type: 'cicle',
            data: [30, 30, 80, 40, 50, 40]
          },
          {
            name: '占比',
            type: 'cicle',
            data: [30, 30, 80, 40, 50, 40]
          }
        ]
      }
    }
  }
}
</script>
```
:::

### 混合纵向柱状图

:::demo 定义多series，但是series中的每个子项的type不同。
```html
<template>
  <CstSquareBar
    id="cstSquareBar5"
    :options="options"
  ></CstSquareBar>
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
            type: 'square',
            data: [50000, 30000, 30000, 20000, 40000, 60000]
          },
          {
            name: '占比',
            type: 'cicle',
            data: [30, 30, 80, 40, 50, 40]
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
