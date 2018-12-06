<template>
  <div>
    <mt-header fixed title="登录"></mt-header>
    <div>
      <h5>
        <mt-button type="danger" size="large" @click.native="handleRegister">注册</mt-button>
      </h5>
      <h5>
        <mt-button type="primary" size="large">登录</mt-button>
      </h5>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleRegister () {
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>
