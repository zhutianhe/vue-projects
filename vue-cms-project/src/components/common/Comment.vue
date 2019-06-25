<!-- 用户评论公共组件 -->
<template>
  <div class='tmpl'>
    <ul>
      <li class="comment">
        <div>
          <span>提交评论</span>
          <span><a @click="goback">返回</a></span>
        </div>
      </li>
      <li class="comment-text">
        <textarea style="width:100%" v-model="content"></textarea>
      </li>
      <li>
        <mt-button type="primary" size="large" @click="sendMsg">发表评论</mt-button>
      </li>
      <li>
        <div class="comment-label">
          <span>评论列表</span>
          <span>34条评论</span>
        </div>
      </li>
    </ul>
    <!-- 评论内容列表 -->
    <ul class="comment-list">
      <li v-for="(msg, index) in msgs" :key="index">
        {{msg.user_name}}: {{msg.content}} {{msg.add_time | relTime}}
      </li>
    </ul>
    <mt-button size="large" type="danger" plain @click="loadMsgByPage" :disabled="disabled">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  name: 'comment',
  props: ['cid'],
  data () {
    return {
      content: '',
      msgs: [],
      page: 1,
      disabled: false
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    init () {
      this.page = 1
    },
    sendMsg () {
      this.$axios.post(`postcomment/${this.cid}`, `content=${this.content}`)
        .then(res => {
          this.init()
          this.loadMsgByPage()
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadMsgByPage () {
      this.$axios.get(`getcomments/${this.cid}?pageindex=${this.page}`)
        .then(res => {
          if (res.data.data.length < 10 && this.page !== 1) {
            this.$toast({
              message: '没有数据了',
              iconClass: 'icon icon-success'
            })
            this.disabled = true
            return
          }

          if (this.page === 1) {
            this.msgs = res.data.data
          } else {
            this.msgs = this.msgs.concat(res.data.data)
          }
          this.page++
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.loadMsgByPage()
  },
  mounted () {

  }
}
</script>
<style scoped>
.comment div span:nth-child(1) {
  float: left;
  font-weight: bold;
  margin-left: 5px;
}

.comment div span:nth-child(2) {
  float: right;
}

.comment {
  height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  line-height: 30px;
  margin-bottom: 5px;
}

.comment-text {
  padding: 5 5;
}

.comment-text textarea{
  margin-bottom: 5px;
}

.comment-list li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
}
</style>
