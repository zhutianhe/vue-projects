<template>
  <div class="tmpl">
    <nav-bar title="图文分享"></nav-bar>
    <!-- 图文导航 -->
    <div class="photo-header">
      <ul>
        <li v-for="category in categories" :key="category.id">
          <a href="javascript:void(0);" @click="navigateToCategoryById(category.id)">
            {{category.title}}
          </a>
        </li>
      </ul>
    </div>
    <!-- 图文列表 -->
    <div class="photo-list">
      <ul>
        <li v-for="(img, index) in images" :key="index">
          <router-link :to="{name: 'PhotoDetail', params: {id: img.id}}">
            <img v-lazy="img.img_url" alt="">
            <p>
              <span>{{img.title}}</span>
              <br>
              <span>{{img.zhaiyao}}</span>
            </p>
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
      categories: [], // 分类
      images: []
    }
  },
  // 导航守卫
  beforeRouteUpdate (to, from, next) {
    let {categoryId} = to.query
    this.loadImagesById(categoryId)
    next()
  },
  created () {
    let {categoryId} = this.$route.query
    this.loadImagesById(categoryId)

    // 获得分类信息
    this.$axios.get('getimgcategory')
      .then(res => {
        this.categories = res.data.data
        this.categories.unshift({id: 0, title: '全部'})
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    // 点击分类
    navigateToCategoryById (id) {
      this.$router.push({
        name: 'PhotoList',
        query: {categoryId: id}
      })
    },

    // 加载图片
    loadImagesById (categoryId) {
      this.$axios.get('getimages/' + categoryId)
        .then(res => {
          this.images = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.photo-header ul {
  white-space: nowrap;
  overflow-x: auto;
  padding-left: 0rem;
  margin: 5px;
}

.photo-header li {
  list-style: none;
  display: inline-block;
  margin-left: 10px;
  height: 30px;
}

.photo-list ul {
  padding-left: 0;
  margin: 0;
}

.photo-list li {
  list-style: none;
  position: relative;
}

.photo-list li img {
  width: 100%;
  height: 230px;
  vertical-align: top;
}

.photo-list p {
  position: absolute;
  bottom: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 0;
}

.photo-list p span:nth-child(2) {
  font-weight: bold;
  font-size: 16px;
}

image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
