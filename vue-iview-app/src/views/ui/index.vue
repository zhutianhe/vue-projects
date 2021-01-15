<template>
  <Layout>
    <Sider
      hide-trigger
      :style="{
        position: 'fixed',
        height: '100vh',
        background: '#fff',
        left: 0,
        top: '64px',
        overflow: 'auto',
      }"
    >
      <Menu
        active-name="1-2"
        theme="light"
        width="auto"
        :open-names="['1']"
        @on-select="handleSelectItem"
      >
        <template v-for="item in menu">
          <Submenu
            v-if="item.children && item.children.length > 0"
            :name="item.name"
            :key="item.value"
          >
            <template slot="title">
              <Icon :type="item.icon"></Icon>
              {{ item.label }}
            </template>
            <MenuItem
              :name="childitem.name"
              v-for="childitem in item.children"
              :key="childitem.value"
            >
              {{ childitem.label }}
            </MenuItem>
          </Submenu>
          <MenuItem v-else :name="item.name" :key="item.value">
            <Icon :type="item.icon"></Icon>
            {{ item.label }}
          </MenuItem>
        </template>
      </Menu>
    </Sider>
    <Layout :style="{ padding: '0 24px 24px', margin: '64px 0 0 200px' }">
      <Breadcrumb :style="{ margin: '24px 0' }">
        <BreadcrumbItem v-for="item in breadcrumb" :key="item">{{ item }}</BreadcrumbItem>
      </Breadcrumb>
      <Content :style="{ padding: '24px', minHeight: '280px', background: '#fff' }">
        <!-- <pre>
          <code>
            &lt;span&gt;我是span&lt;/span&gt;
          </code>
        </pre>
        <code><span>我是span</span></code> -->
      </Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
  components: {},
  props: {

  },
  data() {
    return {
      menu: [
        {
          name: '1',
          label: '边框',
          value: '1',
          icon: 'ios-navigate',
        },
        {
          name: '2',
          label: '按钮',
          value: '2',
          icon: 'ios-navigate',
          children: [
            {
              name: '2-1',
              label: '常见按钮和四态',
              value: '2-1',
              icon: 'ios-navigate'
            },
            {
              name: '2-2',
              label: '其他类型按钮',
              value: '2-2',
              icon: 'ios-navigate'
            },
            {
              name: '2-3',
              label: '加载按钮',
              value: '2-3',
              icon: 'ios-navigate'
            },
            {
              name: '2-4',
              label: '不同尺寸',
              value: '2-4',
              icon: 'ios-navigate'
            }
          ]
        },
        {
          name: '3',
          label: '导航',
          value: '3',
          icon: 'ios-navigate',
          children: [
            {
              name: '3-1',
              label: '分页',
              value: '3-1',
              icon: 'ios-navigate'
            },
            {
              name: '3-2',
              label: '标签页',
              value: '3-2',
              icon: 'ios-navigate'
            },
            {
              name: '3-3',
              label: '面包屑',
              value: '3-3',
              icon: 'ios-navigate'
            },
            {
              name: '3-4',
              label: '步骤条',
              value: '3-4',
              icon: 'ios-navigate'
            },
            {
              name: '3-5',
              label: '侧边导航',
              value: '3-5',
              icon: 'ios-navigate'
            },
            {
              name: '3-6',
              label: '锚点',
              value: '3-6',
              icon: 'ios-navigate'
            },
            {
              name: '3-7',
              label: '返回',
              value: '3-7',
              icon: 'ios-navigate'
            }
          ]
        },
        {
          name: '4',
          label: '数据录入',
          value: '4',
          icon: 'ios-navigate',
          children: [
            {
              name: '4-1',
              label: '单选',
              value: '4-1',
              icon: 'ios-navigate'
            },
            {
              name: '4-2',
              label: '多选',
              value: '4-2',
              icon: 'ios-navigate'
            },
            {
              name: '4-3',
              label: '开关',
              value: '4-3',
              icon: 'ios-navigate'
            },
            {
              name: '4-4',
              label: '输入框',
              value: '4-4',
              icon: 'ios-navigate'
            },
            {
              name: '4-5',
              label: '选择器',
              value: '4-5',
              icon: 'ios-navigate'
            },
            {
              name: '4-6',
              label: '日期选择',
              value: '4-6',
              icon: 'ios-navigate'
            },
            {
              name: '4-7',
              label: '时间选择框',
              value: '4-7',
              icon: 'ios-navigate'
            },
            {
              name: '4-8',
              label: '表单',
              value: '4-8',
              icon: 'ios-navigate'
            },
            {
              name: '4-9',
              label: '滑动输入条',
              value: '4-9',
              icon: 'ios-navigate'
            },
            {
              name: '4-10',
              label: '上传',
              value: '4-10',
              icon: 'ios-navigate'
            },
            {
              name: '4-11',
              label: '穿梭框',
              value: '4-11',
              icon: 'ios-navigate'
            }
          ]
        },
        {
          name: '5',
          label: '数据展示',
          value: '5',
          icon: 'ios-navigate',
          children: [
            {
              name: '5-1',
              label: '头像',
              value: '5-1',
              icon: 'ios-navigate'
            },
            {
              name: '5-2',
              label: '标签',
              value: '5-2',
              icon: 'ios-navigate'
            },
            {
              name: '5-3',
              label: '文字提示',
              value: '5-3',
              icon: 'ios-navigate'
            },
            {
              name: '5-4',
              label: '状态',
              value: '5-4',
              icon: 'ios-navigate'
            },
            {
              name: '5-5',
              label: '列表',
              value: '5-5',
              icon: 'ios-navigate'
            },
            {
              name: '5-6',
              label: '折叠面板',
              value: '5-6',
              icon: 'ios-navigate'
            },
            {
              name: '5-7',
              label: '卡片面板',
              value: '5-7',
              icon: 'ios-navigate'
            }
          ]
        },
        {
          name: '6',
          label: '反馈',
          value: '6',
          icon: 'ios-navigate',
          children: [
            {
              name: '6-1',
              label: '信息录入弹框',
              value: '6-1',
              icon: 'ios-navigate'
            },
            {
              name: '6-2',
              label: '对话框',
              value: '6-2',
              icon: 'ios-navigate'
            },
            {
              name: '6-3',
              label: '通知提醒框',
              value: '6-3',
              icon: 'ios-navigate'
            },
            {
              name: '6-4',
              label: '气泡确认框',
              value: '6-4',
              icon: 'ios-navigate'
            },
            {
              name: '6-5',
              label: '警告提示',
              value: '6-5',
              icon: 'ios-navigate'
            },
            {
              name: '6-6',
              label: '全局提示',
              value: '6-6',
              icon: 'ios-navigate'
            },
            {
              name: '6-7',
              label: '进度条',
              value: '6-7',
              icon: 'ios-navigate'
            },
            {
              name: '6-8',
              label: '抽屉',
              value: '6-8',
              icon: 'ios-navigate'
            },
            {
              name: '6-9',
              label: '抽屉折叠',
              value: '6-9',
              icon: 'ios-navigate'
            }
          ]
        },
        {
          name: '7',
          label: '其他',
          value: '7',
          icon: 'ios-navigate',
          children: [
            {
              name: '7-1',
              label: '阴影',
              value: '7-1',
              icon: 'ios-navigate'
            },
            {
              name: '7-2',
              label: '边距',
              value: '7-2',
              icon: 'ios-navigate'
            },
            {
              name: '7-3',
              label: '占位图',
              value: '7-3',
              icon: 'ios-navigate'
            }
          ]
        }
      ],
      breadcrumb: ['UI组件库', '边框']
    }
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleSelectItem(name) {
      let indexArr = name.split('-')
      this.breadcrumb = ['UI组件库', this.menu[indexArr[0] - 1].label]
      this.menu[indexArr[0] - 1].children.map((v, i) => {
        if (i === indexArr[1] - 1) {
          this.breadcrumb.push(v.label)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
