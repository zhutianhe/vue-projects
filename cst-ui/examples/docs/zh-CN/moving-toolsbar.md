## MovingToolsbar 移动工具条

移动工具条是针对多数据表格进行批量操作的一个工具栏，配合表格的单选和多选，可以对表格进行自定义操作。

### 基础用法

默认在粘贴在屏幕右侧边框，也可以通过覆盖样式进行自定义

:::demo 通过赋值`options`来实现，options是配置工具条上所显示的操作选项。
```html
<template>
  <CstMovingToolsbar
    ref="CustomMovingToolsbar"
    :options="options"
    @click="handleClick"
  ></CstMovingToolsbar>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          label: '增加',
          code: 'add',
          icon: 'el-icon-circle-plus-outline'
        },
        {
          label: '删除',
          code: 'delete',
          icon: 'el-icon-delete'
        },
        {
          label: '编辑',
          code: 'edit',
          icon: 'el-icon-edit'
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
