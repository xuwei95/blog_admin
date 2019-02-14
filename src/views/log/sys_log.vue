<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Sys_log',
  data() {
    return {
      msg: '系统日志'
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

