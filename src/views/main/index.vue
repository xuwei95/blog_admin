<template>
  <div class="app-container">
    {{ msg }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '控制台'
    }
  }
}
</script>

<style scoped>
.app-container{
    text-align: center;
  }
</style>

