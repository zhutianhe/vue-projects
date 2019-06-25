<!-- 图文详情 -->
<template>
  <div class='tmpl'>
    <nav-bar title="图文详情"></nav-bar>
    <!-- 图片标题 -->
    <div class="photo-title">
      <p>{{photoInfo.title}}</p>
      <span>发起日期：{{photoInfo.add_time | convertTime('YYYY年MM月DD日')}}</span>
      <span>{{photoInfo.click}}次浏览</span>
    </div>
    <!-- 缩略图 -->
    <my-ul>
      <my-li v-for="(img, index) in images" :key="index">
        <img :src="img.src" alt="">
      </my-li>
    </my-ul>
    <!-- 图片预览 -->
    <div class="photo-preview">
      <vue-preview :slides="slide1"></vue-preview>
    </div>
    <!-- 图片内容 -->
    <div class="photo-desc">
      <!-- 文字说明 -->
      <p v-html="photoInfo.content"></p>
    </div>
    <!-- 图片评论 -->
    <comment :cid="$route.params.id"></comment>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      images: [],
      photoInfo: {},
      slide1: []
    }
  },
  methods: {

  },
  created () {
    let pid = this.$route.params.id
    // 获取图文详情
    this.$axios.get('getimageinfo/' + pid)
      .then(res => {
        this.photoInfo = res.data.data
      })
      .catch(err => {
        console.log(err)
      })

    // 获取缩略图信息
    this.$axios.get(`getthumimages/${pid}`)
      .then(res => {
        this.images = res.data.data
      })
      .catch(err => {
        console.log(err)
      })

    // 获取预览图信息
    this.$axios.get('getimagepreview')
      .then(res => {
        this.slide1 = res.data.data
        this.slide1.forEach(img => {
          img.msrc = img.src
        })
        console.log(this.slide1)
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted () {

  }
}
</script>
<style scoped>
.photo-title,
.photo-desc {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
}

.photo-title p {
  color: #13c2f7;
  font-size: 20px;
  font-weight: bold;
}

.photo-title span {
  margin-right: 20px;
}

.photo-desc p {
  font-size: 18px;
}

</style>
