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
        active-name="1-1"
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
              :to="childitem.link"
            >
              {{ childitem.label }}
            </MenuItem>
          </Submenu>
          <MenuItem v-else :name="item.name" :key="item.value" :to="item.link">
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
        <router-view></router-view>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
  components: {
  },
  props: {

  },
  data() {
    return {
      menu: [
        {
          name: '1',
          label: '输入框',
          value: '1',
          icon: 'ios-navigate',
          link: '/custom/input'
        },
        {
          name: '2',
          label: '级联下拉',
          value: '2',
          icon: 'ios-navigate',
          link: '/custom/cascader'
        },
        {
          name: '3',
          label: '增删列表',
          value: '3',
          icon: 'ios-navigate',
          link: '/custom/list'
        },
        {
          name: '4',
          label: '倒计时',
          value: '4',
          icon: 'ios-navigate',
          link: '/custom/timedown'
        },
        {
          name: '5',
          label: '高级搜索',
          value: '5',
          icon: 'ios-navigate',
          link: '/custom/higher-query'
        },
        {
          name: '6',
          label: '增删级联下拉',
          value: '6',
          icon: 'ios-navigate',
          link: '/custom/higher-query'
        },
        {
          name: '7',
          label: '选择标签',
          value: '7',
          icon: 'ios-navigate',
          link: '/custom/higher-query'
        },
        {
          name: '8',
          label: 'Excel表格',
          value: '8',
          icon: 'ios-navigate',
          link: '/custom/higher-query'
        },
        {
          name: '9',
          label: '权重计算器',
          value: '9',
          icon: 'ios-navigate',
          link: '/custom/higher-query'
        },
        {
          name: '10',
          label: '列表悬浮操作栏',
          value: '10',
          icon: 'ios-navigate',
          link: '/custom/higher-query'
        },
        {
          name: '11',
          label: '时间线',
          value: '11',
          icon: 'ios-navigate',
          link: '/custom/higher-query'
        },
        {
          name: '12',
          label: '瀑布流',
          value: '12',
          icon: 'ios-navigate',
          link: '/custom/higher-query'
        }
      ],
      breadcrumb: ['自定义组件库', '输入框']
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
      this.breadcrumb = ['自定义组件库', this.menu[indexArr[0] - 1].label]
      // this.menu[indexArr[0] - 1].children.map((v, i) => {
      //   if (i === indexArr[1] - 1) {
      //     this.breadcrumb.push(v.label)
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
h2 {
  margin: 10px 0;
}
h3 {
  margin: 55px 0 20px;
}
.ivu-layout-content .demo-style {
  > div {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
    margin-bottom: 24px;
    &:hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }
    .source {
      padding: 24px;
    }
    .meta {
      background-color: #fafafa;
      border-top: 1px solid #eaeefb;
      overflow: hidden;
      transition: height 0.2s;
      .description {
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #ebebeb;
        border-radius: 3px;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        word-break: break-word;
        margin: 10px;
        background-color: #fff;
      }
      // .highlight {
      .highlight code {
        display: block;
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;
        padding: 18px 24px;
      }
    }
  }
}
</style>
