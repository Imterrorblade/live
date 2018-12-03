<template>
  <mt-tabbar v-model="activeMenu" fixed>
    <mt-tab-item v-for="(menu, index) in menus" :id="menu.path" :key="index">
      <img>
      {{menu.name}}
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
import menus from '@/config/menus.js'
export default {
  data(){
    return {
    }
  },
  computed: {
    menus(){
      return menus.map(menu => {
        return {
          path: `/${menu.path}`,
          name: menu.name
        }
      })
    },
    activeMenu: {
      get(){
        return this.$route.path
      },
      set(value){
        this.$router.push({
          path: value
        })
      }
    }
  }
}
</script>
