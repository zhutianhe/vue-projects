<template>
  <div id="app">
    <Layout>
      <Header :style="{ position: 'fixed', width: '100%', zIndex: '9999' }">
        <Menu mode="horizontal" theme="dark" active-name="ui" @on-select="handleSelectItem">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="home">
              <Icon type="ios-navigate"></Icon>
              首页
            </MenuItem>
            <MenuItem name="ui">
              <Icon type="ios-navigate"></Icon>
              UI组件库
            </MenuItem>
            <MenuItem name="visual">
              <Icon type="ios-keypad"></Icon>
              可视化组件库
            </MenuItem>
            <MenuItem name="custom">
              <Icon type="ios-analytics"></Icon>
              自定义组件
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <router-view></router-view>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  methods: {
    handleSelectItem(name) {
      this.$router.push({ path: '/' + name })
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 520px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
