<template>
  <div>
    <mt-header fixed title="注册"></mt-header>
    <div>
      <mt-field label="用户名" placeholder="输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="输入密码" v-model="password" type="password"></mt-field>
      <h5>
        <mt-button type="primary" size="large" @click.native="register">提交</mt-button>
      </h5>
    </div>
  </div>
  </template>

<script>
import api from '@/api/user'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register () {
      api.register({
        username: this.username,
        password: this.password
      }).then(res => {
        console.log(res)
        this.$messageBox('提示', '操作成功')
        this.router.push({
          path: '/live'
        })
      }).catch(err => {
        this.$messageBox('提示', err.message)
      })
    }
  }
}
</script>
