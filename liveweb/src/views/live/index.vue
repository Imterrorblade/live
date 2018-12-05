<template>
  <contain-com></contain-com>
</template>
<script>
import api from '@/api/live.js'
import ContainCom from '@/views/contain'
export default {
  data(){
    return {}
  },
  methods: {
    init(){
      // this.ping()
    },
    ping(){
      api.ping().then(()=>{
        alert('成功')
      }).catch(err => {
        alert('ping 失败')
      })
    }
  },
  mounted(){
    this.init()
  },
  components: {
    ContainCom
  }
}
</script>

