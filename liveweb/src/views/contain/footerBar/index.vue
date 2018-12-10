<template>
  <div class="foolter-bar">
    <slot name="bar"></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style>
  .foolter-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0
  }
</style>
