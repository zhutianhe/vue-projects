<template>
  <div>
    <p>我是登录页</p>
    <userLogin></userLogin>
  </div>
</template>
<script>
import userLogin from './userlogin'
export default {
  name: 'login',
  components: {
    userLogin
  },
  data () {
    return {
      html: ''
    }
  },
  created () {
    this.$axios.get('/api/getCode').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  mounted () { },
  methods: {}
}
</script>
