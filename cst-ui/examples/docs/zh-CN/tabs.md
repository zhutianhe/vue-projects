## Tabs 标签页

选项卡切换组件，常用于平级区域大块内容的的收纳和展现。

### 代码示例

:::demo value 与 TabPane 的 name 对应，用于标识当前激活的是哪一项，name 值默认从 0 开始，默认激活第一项。可以使用 v-model 双向绑定数据。
```html
<Tabs value="name1">
  <TabPane label="标签一" name="name1">标签一的内容</TabPane>
  <TabPane label="标签二" name="name2">标签二的内容</TabPane>
  <TabPane label="标签三" name="name3">标签三的内容</TabPane>
</Tabs>
<br />
<Tabs value="name1">
  <TabPane label="标签一" name="name1">可用标签一</TabPane>
  <TabPane label="标签二" name="name2" disabled>禁用标签二</TabPane>
  <TabPane label="标签三" name="name3">可用标签三</TabPane>
</Tabs>
<br />
<Tabs>
  <TabPane label="macOS" icon="logo-apple">macOS</TabPane>
  <TabPane label="Windows" icon="logo-windows">Windows</TabPane>
  <TabPane label="Linux" icon="logo-tux">Linux</TabPane>
</Tabs>
<br />
<Tabs type="card">
  <TabPane label="标签一">标签一的内容</TabPane>
  <TabPane label="标签二">标签二的内容</TabPane>
  <TabPane label="标签三">标签三的内容</TabPane>
</Tabs>
```
:::

### Tabs Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|  |  |  |  |  |

### TabPane Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|  |  |  |  |  |
