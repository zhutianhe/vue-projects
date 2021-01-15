## ExcelTable excel表格

如果页面需要上传用户的excel表格并做在线预览，可以使用excel表格组件

### 基础用法

:::demo 配置参数`data`和`columns`, data是数据集，一般都为后台返回。columns是表格的列名，需要和后台返回的数据一一对应。
```html
<CstExcelTable ref="customExcelTable" :data="data" :columns="columns"></CstExcelTable>
<script>
export default {
  data() {
    return {
      data: [{
        range: "网络安全工作责任制",
        content: "1",
        requirement: "将网络安全纳入本单位重要议事议程次数≥2次",
        submission: "会议材料、会议纪要等",
        remark: "东风党发〔2018〕16号  关于印发《东风汽车集团有限公司网络安全工作责任制实施办法》的通知 东风组信发〔2017〕15号 关于建立东风汽车公司网络与信息安全通报机制的通知 ",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全工作责任制",
        content: "6",
        requirement: "组织开展网络安全自查检查次数≥1",
        submission: "检查报告",
        remark: "东风党发〔2018〕16号  关于印发《东风汽车集团有限公司网络安全工作责任制实施办法》的通知 东风组信发〔2017〕15号 关于建立东风汽车公司网络与信息安全通报机制的通知 ",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全工作责任制",
        content: "各二级单位指导监管所属单位网络安全工作",
        requirement: "对所属单位开展日常网络安全检查工作",
        submission: "检查报告",
        remark: "东风党发〔2018〕16号  关于印发《东风汽车集团有限公司网络安全工作责任制实施办法》的通知 东风组信发〔2017〕15号 关于建立东风汽车公司网络与信息安全通报机制的通知 ",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全工作责任制",
        content: "各二级单位指导监管所属单位网络安全工作",
        requirement: "监督所属单位对安全风险进行整改",
        submission: "整改报告",
        remark: "东风党发〔2018〕16号  关于印发《东风汽车集团有限公司网络安全工作责任制实施办法》的通知 东风组信发〔2017〕15号 关于建立东风汽车公司网络与信息安全通报机制的通知 ",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全等级保护",
        content: "满足合规-互联网端等级保护工作",
        requirement: "取得互联网电子邮件系统等保测评备案证明",
        submission: "互联网电子邮件系统等保备案证明",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全等级保护",
        content: "满足合规-互联网端等级保护工作",
        requirement: "开展关键信息基础设施排查，取得等保测评备案证明",
        submission: "关键信息基础设施等保备案证明",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全等级保护",
        content: "系统安全定级评估",
        requirement: "内部系统安全定级覆盖率＝100%",
        submission: "定级报告",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全等级保护",
        content: "系统安全定级评估",
        requirement: "重要系统（2-3级）安全评估工作覆盖率=100%",
        submission: "安全评估报告",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全等级保护",
        content: "系统安全定级评估",
        requirement: "重要系统安全整改完成率=100%",
        submission: "安全整改报告",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "信息安全专项规划",
        content: "编制十四五信息安全专项规划",
        requirement: "将国家要求、行业趋势、技术趋势、攻防检查评价问结果、规划要求及原则、本单位现状作为输入，编制5年“十四五”专项规划。",
        submission: "初版报告 终板报告",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "数字化安全",
        content: "车联网安全、工业互联网安全",
        requirement: "组织各单位探讨及参与国家补贴项目，意向单位参与",
        submission: "国补项目申报及实施",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "数字化安全",
        content: "大数据安全",
        requirement: "根据本单位情况，开展个人信息保护与重要业务数据安全方案实施",
        submission: "项目实施",
        remark: "无",
        weight: '2',
        planScore: '90',
      }],
      columns: [
        { prop: 'range', label: '督办范围', width: 'auto' },
        { prop: 'content', label: '工作内容', width: 'auto' },
        { prop: 'requirement', label: '工作要求', width: 'auto' },
        { prop: 'submission', label: '提交物要求', width: 'auto' },
        { prop: 'remark', label: '备注', width: 'auto' }
      ]
    }
  }
}
</script>
```
:::

### 定义插槽

:::demo 当需要对默认的表格进行扩展，只需要在`columns`配置的添加含有`slot=true`的属性，并在组件内部定义和`props`同名的插槽，则可以自定义该列的内容。
```html
<CstExcelTable ref="customExcelTable" :data="data" :columns="slotColumns">
  <!-- 指标权重 -->
  <template slot-scope="{ row }" slot="weight">
    {{ row.weight }}
  </template>
  <!-- 分配分数 -->
  <template slot-scope="{ row }" slot="planScore">
    {{ row.planScore }}
  </template>
</CstExcelTable>
<script>
export default {
  data() {
    return {
      data: [{
        range: "网络安全工作责任制",
        content: "1",
        requirement: "将网络安全纳入本单位重要议事议程次数≥2次",
        submission: "会议材料、会议纪要等",
        remark: "东风党发〔2018〕16号  关于印发《东风汽车集团有限公司网络安全工作责任制实施办法》的通知 东风组信发〔2017〕15号 关于建立东风汽车公司网络与信息安全通报机制的通知 ",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全工作责任制",
        content: "6",
        requirement: "组织开展网络安全自查检查次数≥1",
        submission: "检查报告",
        remark: "东风党发〔2018〕16号  关于印发《东风汽车集团有限公司网络安全工作责任制实施办法》的通知 东风组信发〔2017〕15号 关于建立东风汽车公司网络与信息安全通报机制的通知 ",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全工作责任制",
        content: "各二级单位指导监管所属单位网络安全工作",
        requirement: "对所属单位开展日常网络安全检查工作",
        submission: "检查报告",
        remark: "东风党发〔2018〕16号  关于印发《东风汽车集团有限公司网络安全工作责任制实施办法》的通知 东风组信发〔2017〕15号 关于建立东风汽车公司网络与信息安全通报机制的通知 ",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全工作责任制",
        content: "各二级单位指导监管所属单位网络安全工作",
        requirement: "监督所属单位对安全风险进行整改",
        submission: "整改报告",
        remark: "东风党发〔2018〕16号  关于印发《东风汽车集团有限公司网络安全工作责任制实施办法》的通知 东风组信发〔2017〕15号 关于建立东风汽车公司网络与信息安全通报机制的通知 ",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全等级保护",
        content: "满足合规-互联网端等级保护工作",
        requirement: "取得互联网电子邮件系统等保测评备案证明",
        submission: "互联网电子邮件系统等保备案证明",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全等级保护",
        content: "满足合规-互联网端等级保护工作",
        requirement: "开展关键信息基础设施排查，取得等保测评备案证明",
        submission: "关键信息基础设施等保备案证明",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全等级保护",
        content: "系统安全定级评估",
        requirement: "内部系统安全定级覆盖率＝100%",
        submission: "定级报告",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全等级保护",
        content: "系统安全定级评估",
        requirement: "重要系统（2-3级）安全评估工作覆盖率=100%",
        submission: "安全评估报告",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "网络安全等级保护",
        content: "系统安全定级评估",
        requirement: "重要系统安全整改完成率=100%",
        submission: "安全整改报告",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "信息安全专项规划",
        content: "编制十四五信息安全专项规划",
        requirement: "将国家要求、行业趋势、技术趋势、攻防检查评价问结果、规划要求及原则、本单位现状作为输入，编制5年“十四五”专项规划。",
        submission: "初版报告 终板报告",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "数字化安全",
        content: "车联网安全、工业互联网安全",
        requirement: "组织各单位探讨及参与国家补贴项目，意向单位参与",
        submission: "国补项目申报及实施",
        remark: "无",
        weight: '2',
        planScore: '90',
      }, {
        range: "数字化安全",
        content: "大数据安全",
        requirement: "根据本单位情况，开展个人信息保护与重要业务数据安全方案实施",
        submission: "项目实施",
        remark: "无",
        weight: '2',
        planScore: '90',
      }],
      slotColumns: [
        { prop: 'range', label: '督办范围', width: 'auto' },
        { prop: 'content', label: '工作内容', width: 'auto' },
        { prop: 'requirement', label: '工作要求', width: 'auto' },
        { prop: 'submission', label: '提交物要求', width: 'auto' },
        { prop: 'remark', label: '备注', width: 'auto' },
        { prop: 'weight', label: '指标权重', slot: true, width: 'auto' },
        { prop: 'planScore', label: '分配分数', slot: true, width: 'auto' }
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
