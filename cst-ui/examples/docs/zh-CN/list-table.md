## ListTable 可视化列表

倒计时插件是表示一个时间区间的倒计时，会分别表示出距离这段区间的开始时间和结束时间的剩余时分秒。

### 基础用法

隔行变色列表

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`。
```html
<template>
  <div class="check-box">
    <el-radio-group v-model="align" size="medium">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="center">居中对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>  
    </el-radio-group>
  </div>
  <CstListBasicTable
    :row-class-name="rowClassName"
    :align="align"
    :data="data"
    :columns="columns"
  ></CstListBasicTable>
</template>
<script>
export default {
  data() {
    return {
      align: "left",
      data: [
        {
          time: "2020-01",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "1",
        },
        {
          time: "2020-02",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "2",
        },
        {
          time: "2020-03",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "3",
        },
        {
          time: "2020-04",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "4",
        },
        {
          time: "2020-05",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "5",
        },
        {
          time: "2020-05",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "6",
        },
        {
          time: "2020-06",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "7",
        },
      ],
      columns: [
        {
          title: "时间",
          key: "time",
        },
        {
          title: "源IP",
          key: "srcIp",
        },
        {
          title: "目的Ip",
          key: "distIp",
        },
        {
          title: "攻击次数",
          key: "count",
        }
      ]
    }
  },
  methods: {
    rowClassName(row, index) {
      if (index % 2) {
        return "row-even";
      }
      return "row-odd";
    }
  }
}
</script>
```
:::

### 基础用法

自定义列颜色

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`。
```html
<template>
  <div class="check-box">
    <el-radio-group v-model="align" size="medium">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="center">居中对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
    </el-radio-group>
  </div>
  <CstListBasicTable
    :align="align"
    :data="data"
    :columns="columns"
  ></CstListBasicTable>
</template>
<script>
export default {
  data() {
    return {
      align: "left",
      data: [
        {
          time: "2020-01",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "1",
        },
        {
          time: "2020-02",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "2",
        },
        {
          time: "2020-03",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "3",
        },
        {
          time: "2020-04",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "4",
        },
        {
          time: "2020-05",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "5",
        },
        {
          time: "2020-05",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "6",
        },
        {
          time: "2020-06",
          srcIp: "1.1.1.1",
          distIp: "196.168.1.1",
          count: "7",
        },
      ],
      columns: [
        {
          title: "时间",
          key: "time",
          className: "table-odd-column",
        },
        {
          title: "源IP",
          key: "srcIp",
          className: "table-even-column",
        },
        {
          title: "目的Ip",
          key: "distIp",
          className: "table-odd-column",
        },
        {
          title: "攻击次数",
          key: "count",
          className: "table-even-column",
        },
      ]
    }
  }
}
</script>
```
:::

### 时间轴列表用法

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`。
```html
<template>
  <CstListTimeTable :options="options"></CstListTimeTable>
</template>
<script>
export default {
  data() {
    return {
      options: {
        data: [
          {
            startTime: "2020/05/21 19:15:26",
            type: "投递",
            desc: "196.168.1.1 对 84.200.16.11 进行 { 恶意软件攻击 }",
          },
          {
            startTime: "2020/05/21 19:15:26",
            type: "投递",
            desc: "196.168.1.1 对 84.200.16.11 进行 { 恶意软件攻击 }",
          },
          {
            startTime: "2020/05/21 19:15:24",
            type: "投递",
            desc: "196.168.1.1 对 84.200.16.11 进行 { 恶意软件攻击 }",
          },
          {
            startTime: "2020/05/21 19:15:23",
            type: "投递",
            desc: "196.168.1.1 对 84.200.16.11 进行 { 恶意软件攻击 }",
          },
          {
            startTime: "2020/05/21 19:15:23",
            type: "投递",
            desc: "196.168.1.1 对 84.200.16.11 进行 { 恶意软件攻击 }",
          },
          {
            startTime: "2020/05/21 19:15:22",
            type: "投递",
            desc: "196.168.1.1 对 84.200.16.11 进行 { 恶意软件攻击 }",
          },
        ]
      }
    }
  }
}
</script>
```
:::

### 进度条列表用法

:::demo 通过赋值`timeRange`来实现，timeRange可以自定义，并且格式为`{startTime: new Date(), endTime: new Date()}`。
```html
<template>
  <CstProgressTable id="customSquareBar1" :options="options"></CstProgressTable>
</template>
<script>
export default {
  data() {
    return {
      options: {
        type: 'outline',
        data: [
          {
            label: '192.168.0.1',
            value: 30
          },
          {
            label: '192.168.0.2',
            value: 20
          },
          {
            label: '192.168.0.3',
            value: 70
          },
          {
            label: '192.168.0.4',
            value: 40
          },
          {
            label: '192.168.0.5',
            value: 50
          },
          {
            label: '192.168.0.6',
            value: 60
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
