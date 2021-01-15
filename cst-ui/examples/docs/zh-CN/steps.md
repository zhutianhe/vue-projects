## Steps 步骤条

拆分某项流程的步骤，引导用户按流程完成任务。

### 代码示例

:::demo 基本用法，组件会根据current自动判断各步骤状态。
```html
<Steps :current="0">
  <Step title="正在处理" content="描述文案"></Step>
  <Step title="等待处理" content="描述文案，超出换行"></Step>
  <Step title="等待处理" content="描述文案"></Step>
</Steps>
<br />
<Steps :current="1">
  <Step title="处理完成" content="描述文案"></Step>
  <Step title="正在处理" content="描述文案"></Step>
  <Step title="等待处理" content="描述文案"></Step>
</Steps>
<br />
<Steps :current="1" direction="vertical">
  <Step title="处理完成" content="描述文案"></Step>
  <Step title="正在处理" content="描述文案"></Step>
  <Step title="等待处理" content="描述文案"></Step>
</Steps>
```
:::

### Steps Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|  |  |  |  |  |

### Step Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|  |  |  |  |  |
