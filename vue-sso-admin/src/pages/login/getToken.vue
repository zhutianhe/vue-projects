<template>
  <div>
    回调页面
    <p>{{$route.query.code}}</p>
    {{res}}
  </div>
</template>

<script>
export default {
  name: 'userlogin',
  data () {
    return {
      res: '',
      code: ''
    }
  },
  created () {
    this.$axios.post('/api/getToken', {
      grant_type: 'authorization_code',
      redirect_uri: 'http://192.168.0.108:8080/getToken',
      code: this.$route.query.code,
      scope: 'server'
    }).then(res => {
      console.log('res', res)
      this.res = res
    })
  },
  mounted () { },
  props: [],
  methods: {
  }
}
</script>
