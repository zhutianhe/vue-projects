## CalcInput 输入计算器

当在页面中要输入一个有规律变化的数字时，可以使用输入计算器

### 基础用法

:::demo 通过value参数赋值，默认修改规则为+1和-1。
```html
<CstCalcInput ref="CstCalcInput" v-model="value"></CstCalcInput>
<script>
export default {
  data() {
    return {
      value: '10',
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
