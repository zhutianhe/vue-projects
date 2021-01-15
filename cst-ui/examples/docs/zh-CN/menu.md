## Menu 导航菜单

为页面和功能提供导航的菜单列表，常用于网站顶部和左侧。

### 基础用法

:::demo 基本的分页，页数过多时会自动折叠。
```html
<Menu :theme="theme2" title="产品名称" active-name="1-2" :open-names="['1']">
  <Submenu name="1">
    <template slot="title">
      <Icon type="ios-paper" />
      一级菜单展开
    </template>
    <MenuItem name="1-1">二级菜单未选中</MenuItem>
    <MenuItem name="1-2">二级菜单选中</MenuItem>
    <MenuItem name="1-3">二级菜单未选中</MenuItem>
  </Submenu>
  <Submenu name="2">
    <template slot="title">
      <Icon type="ios-people" />
      一级菜单收起
    </template>
    <MenuItem name="2-1">全局设置</MenuItem>
    <MenuItem name="2-2">使用入门</MenuItem>
  </Submenu>
</Menu>
<script>
export default {

}
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|  |  |  |  |  |
