<template>
  <div>
    <mt-header title="cms管理系统"></mt-header>
    <router-view></router-view>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="Home">
        <div @click="change('Home')">
          <img slot="icon" src="../static/img/index.png">
          首页
        </div>
      </mt-tab-item>
      <mt-tab-item id="Member">
        <div @click="change('Member')">
          <img slot="icon" src="../static/img/vip.png">
          会员
        </div>
      </mt-tab-item>
      <mt-tab-item id="ShopCart">
        <div @click="change('ShopCart')">
          <img slot="icon" src="../static/img/shopcart.png">
          购物车
        </div>
      </mt-tab-item>
      <mt-tab-item id="Search">
        <div @click="change('Search')">
          <img slot="icon" src="../static/img/find.png">
          查找
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      selected: 'Search'
    }
  },
  methods: {
    change (val) {
      this.$router.push({
        name: val
      })
    }
  },
  watch: {
    selected: function (newV, oldV) {
      this.$router.push({
        name: newV
      })
    }
  }
}
</script>

<style scoped>
.mint-tabbar {
  position: fixed;
  bottom: 0;
}

.mint-tab-item-label img {
  display: block;
  width: 25px;
  height: 25px;
  margin: 0 auto;
}

.mint-tab-item-label div {
  font-size: 15px;
}
</style>
