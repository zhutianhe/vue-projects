## Page 分页

当数据量较多时，使用分页可以快速进行数据切换。

### 基础用法

:::demo 基本的分页，页数过多时会自动折叠。
```html
<Page :total="100" /><br>
<Page :total="100" show-sizer /><br>
<Page :total="100" show-elevator /><br>
<Page :total="100" show-total /><br>
<Page :total="40" size="small" show-total /><br>
<Page :total="40" size="small" /><br>
<Page :total="40" size="small" show-elevator show-sizer />
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
