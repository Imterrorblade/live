<template>
  <div>
    <mt-header fixed title="登录"></mt-header>
    <div>
      <mt-field label="用户名" placeholder="输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="输入密码" v-model="password" type="password"></mt-field>
      <h5>
        <mt-button type="primary" size="large" @click.native="login">登录</mt-button>
      </h5>
      <h5>
        <mt-button type="danger" size="large" @click.native="handleRegister">注册</mt-button>
      </h5>
    </div>
  </div>
</template>
<script>
import api from '@/api/user.js'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleRegister () {
      this.$router.push({
        path: '/register'
      })
    },
    login () {
      api.login({
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.success) {
          this.$toast('登录成功')
          this.$router.push({
            path: '/'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
