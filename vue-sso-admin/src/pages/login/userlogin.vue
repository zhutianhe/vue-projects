<template>
  <el-form
    :model="ruleForm"
    status-icon
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名">
      <el-input
        type="text"
        v-model="ruleForm.username"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        type="password"
        v-model="ruleForm.password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
      >提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$axios.post('/api/login', this.ruleForm).then(res => {
        console.log(res)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
