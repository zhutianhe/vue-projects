<template>
  <div class="tmpl">
    <nav-bar :title="title"></nav-bar>
    <!-- 新闻详情 -->
    <div class="news-title">
      <p>{{newsInfo.title}}</p>
      <div>
        <span>{{newsInfo.click}}次点击</span>
        <span>添加时间：{{newsInfo.add_time | convertTime('YYYY-MM-DD')}}</span>
      </div>
      <div class="news-content" v-html="newsInfo.content"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '新闻详情',
      newsInfo: {}
    }
  },
  created () {
    let {id} = this.$route.params
    this.$axios.get('getnews/' + id)
      .then(res => {
        this.newsInfo = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style scoped>
.news-title p {
  color: #0a87f8;
  font-size: 20px;
  font-weight: bold;
}

.news-title span {
  margin-right: 30px;
}

.news-title {
  margin-top: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

/* v-html 只能引用全局样式  scoped中的样式不会对v-html中的内容无效 */
.news-content {
  padding: 10 5;
}

</style>
