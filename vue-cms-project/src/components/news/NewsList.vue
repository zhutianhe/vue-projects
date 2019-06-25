<template>
  <div class="tmpl">
    <nav-bar :title="title"></nav-bar>
    <!-- 新闻列表 -->
    <div class="news-list">
      <ul>
        <li v-for="(news, index) in newsList" :key="index">
          <router-link :to="{name:'NewsDetail', params:{id: news.id}}">
            <img class="" :src="news.img_src" alt="">
            <div>
              <span>{{news.title}}</span>
              <div class="news-desc">
                <p>点击数: {{news.click}}</p>
                <p>发表时间：{{news.add_time | convertTime('YYYY年MM月DD日')}}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '新闻列表',
      newsList: []
    }
  },
  created () {
    this.$axios.get('getnewslist')
      .then(res => {
        this.newsList = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style scoped>
.news-list a {
  display: block;
  height: 44px;
  color: #000;
  padding-left: 15px;
  margin: 10px 0;
}

.news-list img {
  float: left;
  width: 42px;
  height: 42px;
  margin-right: 20px;
}

.news-list a div {
  float: left;
  width: 250px;
  margin-right: 20px;
}
.news-list span {
  display: block;
  width: 100%;
  font-size: 17px;
  line-height: 21px;
}

.news-list a p {
  float: left;
  color: #0bb0f5;
  font-size: 14px;
  line-height: 21px;
  margin: 0px;
}

.news-list p:nth-child(2) {
  float: right;
}

.news-list ul {
  padding: 0;
}

.news-desc {
  height: 21px;
}
</style>
