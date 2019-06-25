<template>
  <div class="tmpl">
    <!-- mnit UI 轮播图使用技巧
    1. 取消HTML文件的doctype
    2. 去掉header的fixed属性
    3. 使用全局样式，去掉8px边框-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in imgList" :key="index">
        <img :src="item.src">
      </mt-swipe-item>
    </mt-swipe>

    <div class="grid">
      <my-ul>
        <my-li v-for="(item, index) in modules" :key="index">
          <router-link :to="item.route">
            <span :class="item.className"></span>
            <div>{{item.title}}</div>
          </router-link>
        </my-li>
      </my-ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      imgList: [],
      modules: [
        {
          title: '新闻资讯',
          className: 'back-news',
          route: { name: 'NewsList' }
        },
        {
          title: '图文分享',
          className: 'back-pic',
          route: { name: 'PhotoList', query: { categoryId: 0 } }
        },
        {
          title: '商品展示',
          className: 'back-goods',
          route: { name: 'Home' }
        },
        {
          title: '留言反馈',
          className: 'back-feed',
          route: { name: 'Home' }
        },
        {
          title: '搜索咨询',
          className: 'back-search',
          route: { name: 'Home' }
        },
        {
          title: '联系我们',
          className: 'back-callme',
          route: { name: 'Home' }
        }
      ]
    }
  },
  created () {
    this.$axios.get('getlunbo')
      .then(res => {
        this.imgList = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.mint-swipe {
  width: 100%;
  height: 200px;
}
.mint-swipe img {
  width: 100%;
}

/*九宫格样式*/
/* img {
        width: 100%;
    }*/
.grid span {
  display: inline-block;
  margin: 10px 0;
  width: 50px;
  height: 50px;
  background-repeat: round;
}

.back-pic {
  background-image: url(../../static/img/picShare.png);
}
.back-goods {
  background-image: url(../../static/img/goodsShow.png);
}
.back-feed {
  background-image: url(../../static/img/feedback.png);
}
.back-search {
  background-image: url(../../static/img/search.png);
}
.back-callme {
  background-image: url(../../static/img/callme.png);
}
.back-news {
  background-image: url(../../static/img/news.png);
}
</style>
